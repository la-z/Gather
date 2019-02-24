/* eslint-disable no-unused-expressions */
const db = require('../models');

const errorHandler = (req, res, err) => {
  console.error(err);
  if (err.message === 'Validation error') {
    return res.send(401, 'already exists');
  } if (err.message === 'Cannot read property \'_modelAttribute\' of undefined') {
    return res.send(201, 'No events found');
  }
  return res.send(500, 'Something went wrong on our part');
};

const requestHandler = {
  logout(req, res) {
    req.logout();
    req.session.destroy(() => {
      res.redirect('/');
    });
  },

  /*
  signup
  on POST /signup
  expects:
    req.body: JSON => { "username", "password" }
  if username in db: 401
  else on creation: login, send 200, {username, id}
  */
  signup(req, res, next) {
    const newUser = req.body;
    db.User.create(newUser)
      .then((returnedUser) => {
        req.login({ username: returnedUser.username, id: returnedUser.id }, (err) => {
          if (err) return next(err);
          return res.json(201, {
            username: returnedUser.username,
            id: returnedUser.id,
          });
        });
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  getEventsByUser
  on GET /events/my-events
  expects:
    req.user => created by passport
    req.query =>  page, 0 indexed, indicates which subset of events desired
                  sortBy, string => property of Event model
    returns: JSON [ Event ]
  */
  getEventsByUser(req, res) {
    const { user } = req;
    // user is put directly on req by passport
    // user => object with props username, id
    const { page, sortBy } = req.query;
    // page, sortBy are Number and String respectively
    db.Event.findAll({
      where: { UserId: user.id },
      order: [[sortBy || 'createdAt', 'DESC']],
      limit: 10,
      // don't want to send all events -- what if there are thousands?
      offset: page * 10 || 0,
      // so we can get a particular slice of events
      // page is 0-indexed
      include: [{
        model: db.User,
        attributes: ['username'],
      }],
      // include data from join table
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  getEvent
  on GET /events/:eventId
  fetches details of individual event in req.params, including all associated comments
  */
  getEvent(req, res) {
    const { eventId } = req.params;
    db.Event.findOne({
      where: { id: eventId },
      include: [{
        model: db.Comment,
        attributes: ['body'],
      }],
    })
      .then((event) => {
        res.status(200).json(Object.assign(event));
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  getCategory
  on GET /events/category/:categoryName
  see getEventsByUser, except by category here
  */
  getCategory(req, res) {
    const { categoryName } = req.params;
    const { page, sortBy } = req.query;
    db.Event.findAll({
      where: { category: categoryName || undefined, private: false },
      // we don't want private events here
      attributes: ['title', 'description', 'time'],
      order: [[sortBy || 'createdAt', 'DESC']],
      limit: 10,
      offset: page * 10 || 0,
      include: [{
        model: db.User,
        attributes: ['username'],
      }],
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  makeNewEvent
  on PUT /events
  expects body => {
    category,
    title,
    description,
    time (Date obj),
    lat (Number),
    long (Number),
    private (bool, default false),
    duration (Integer, minutes)
  }
  associates event with logged in user
  */
  makeNewEvent(req, res) {
    const { body } = req;
    const { user } = req;
    let newEvent;
    db.Event.create(body)
      .then((event) => {
        newEvent = event;
        // need to associate event with creating user immediately
        newEvent.setUser(user);
        // doesn't actually save
        return newEvent.save();
        // does actually save
      })
      .then(savedEvent => res.send(200, savedEvent.id))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  submitNewComment
  on PUT events/:eventId/comments
  or PUT events/:eventId/comments/:commentId
  expects body => {
    body (String)
  }
  associates comment with event and user
  */
  submitNewComment(req, res) {
    const { eventId, commentId } = req.params;
    const { user, body } = req;
    let newComment;
    db.Comment.create(body)
      .then((comment) => {
        newComment = comment;
        newComment.setUser(user);
        return db.Event.findOne({ where: { id: eventId } });
        // need to associate comment with both user and event
      })
      .then((event) => {
        newComment.setEvent(event);
        if (commentId) return db.Comment.findOne({ where: { id: commentId } });
        // commentId represents comment is child of another comment
        return null;
      })
      .then((comment) => {
        if (comment) newComment.setParentComment(comment);
        return newComment.save();
      })
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  deleteComment
  on DELETE /events/:eventId/comments/:commentId
  deletes comment associated with both logged in user and commentId in params
  also deletes child comments
  */
  deleteComment(req, res) {
    const { user } = req;
    const { commentId } = req.params;
    db.Comment.findOne({ where: { id: commentId, UserId: user.id } })
      .then(comment => comment.deleteThread())
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  editComment
  on PATCH /events/:eventId/comments/:commentId
  expects body => {
    body (String)
  }
  updates comment associated with both logged in user and commentId in params
  changes body
  */
  editComment(req, res) {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;
    db.Comment.findOne({ where: { id: commentId, UserId: user.id } })
      .then(comment => comment.update({ body }))
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  deleteEvent
  on DELETE /events/:eventId
  deletes event associated with both user and eventId in params
  */
  deleteEvent(req, res) {
    const { user } = req;
    const { eventId } = req.params;
    db.Event.destroy({ where: { id: eventId, UserId: user.id } })
      .then((destroyedCount) => {
        if (destroyedCount) return res.send(200);
        return res.send(500);
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  editEvent
  on PATCH /events/:eventId
  expects body with one or more of => {
    category,
    title,
    description,
    time (Date obj),
    lat (Number),
    long (Number),
    private (bool, default false),
    duration (Integer, minutes)
  }
  updates event associated with both logged in user and eventId in params
  */
  editEvent(req, res) {
    const { user } = req;
    const { eventId } = req.params;
    const { body } = req;
    db.Event.findOne({ where: { id: eventId, UserId: user.id } })
      .then(event => event.update(body))
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  deleteUser
  on DELETE /users/:userId
  deletes user record corresponding to req.user, then logs out
  */
  deleteUser(req, res) {
    const { user } = req;
    user.destroy()
      .then(() => this.logout(req, res))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  rsvpEvent
  on PUT /events/:eventId/rsvp
  expects body => {
    rsvp: ['interested', 'going', or 'attended']
  }
  adds entry to InterestedEvents with corresponding rsvp value
  }
  */
  rsvpEvent(req, res) {
    const { user, body } = req;
    const { eventId } = req.params;
    user.addEvent(eventId, { through: { rsvp: body.rsvp } })
      // .then(interestedEvent => interestedEvent.save())
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  updateRsvp
  on PATCH /events/:eventId/rsvp
  expects same pattern as rsvpEvent
  */
  updateRsvp(req, res) {
    const { user, body } = req;
    const { eventId } = req.params;
    db.InterestedEvent.findOne({ where: { UserId: user.id, EventId: eventId } })
      .then(interestedEvent => interestedEvent.update({ rsvp: body.rsvp }))
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  removeRsvp
  on DELETE /events/:eventId/rsvp
  deletes record in InterestedEvents corresponding to user and event
  */
  removeRsvp(req, res) {
    const { user } = req;
    const { eventId } = req.params;
    db.InterestedEvent.destroy({ where: { UserId: user.id, EventId: eventId } })
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },
};

module.exports = requestHandler;
