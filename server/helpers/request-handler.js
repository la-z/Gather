/* eslint-disable no-unused-expressions */
const db = require('../models');

const errorHandler = (req, res, err) => {
  console.error(err);
  if (err.message === 'Validation Error') {
    return res.redirect('/');
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
  expects:
    req.body: JSON => { "username", "password" }
  if username in db: redirect /
  else on creation: redirect /users/<username>/profile
  */
  signup(req, res, next) {
    const newUser = req.body;
    db.User.create(newUser)
      .then((returnedUser) => {
        req.login({ username: returnedUser.username, id: returnedUser.id }, (err) => {
          if (err) return next(err);
          return res.redirect(`/users/${req.user.username}/profile`);
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.message === 'Validation error') {
          res.redirect('/');
        }
        res.send(500, 'Something went wrong on our end.');
      });
  },

  /*
  getEventsByUser
  expects:
    req.user => created by passport
    req.query => page, 0 indexed, indicates which subset of events desired
                  sortBy, string => property of Event model
    returns: JSON [ Event ]
  */
  getEventsByUser(req, res) {
    const { user } = req;
    // user is put directly on req by passport
    // user => object with props username, id
    const { page, sortBy } = req.query;
    // page, sortBy are Number and String respectively
    db.Event.find({
      where: { userId: user.id },
      order: sortBy,
      limit: 10,
      // don't want to send all events -- what if there are thousands?
      offset: page * 10,
      // so we can get a particular slice of events
      // page is 0-indexed
      include: [db.User.username],
      // include data from join table
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      });
  },

  /*
  getCategory
  see getEventsByUser, except by category here
  */
  getCategory(req, res) {
    const { categoryName } = req.params;
    const { page, sortBy } = req.query;
    db.Event.findAll({
      where: { category: categoryName, private: false },
      // we don't want private events here
      attributes: ['title', 'description', 'time'],
      order: [[sortBy, 'DESC']],
      limit: 10,
      offset: page * 10,
      include: [db.User],
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      })
      .catch(err => errorHandler(req, res, err));
  },

  getProfile(req, res) {
    res.send(200, 'welcome to your profile');
  },

  /*
  makeNewEvent
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
    const { username } = req.user;
    let newEvent;
    db.Event.create(body)
      .then((event) => {
        newEvent = event;
        return db.User.findOne({ where: { username } });
        // need to associate event with creating user immediately
      })
      .then((foundUser) => {
        newEvent.setUser(foundUser);
        // doesn't actually save
        return newEvent.save();
        // does actually save
      })
      .then(() => res.send(200));
  },

  /*
  submitNewComment
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
        return db.User.findOne({ where: { username: user.username } });
      })
      .then((foundUser) => {
        newComment.setUser(foundUser);
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
      .then(() => res.send(200));
  },

  /*
  deleteComment
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
  deletes user record corresponding to req.user, then logs out
  */
  deleteUser(req, res) {
    const { user } = req;
    db.User.destroy({ where: { id: user.Id } })
      .then(() => this.logout(req, res))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  rsvpEvent
  expects body => {
    rsvp: ['interested', 'going', or 'attended']
  }
  adds entry to InterestedEvents with corresponding rsvp value
  }
  */
  rsvpEvent(req, res) {
    const { user, body } = req;
    const { eventId } = req.params;
    db.User.findOne({ where: { id: user.id } })
      .then((foundUser) => {
        foundUser.addEvent(eventId, { through: { rsvp: body.rsvp } });
        return foundUser.save();
      })
      .then(() => res.send(200))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  updateRsvp
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
