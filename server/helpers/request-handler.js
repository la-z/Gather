/* eslint-disable no-unused-expressions */
const db = require('../models');
// const invitation = require('./invitation');

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
      order: [[sortBy || 'time', 'DESC']],
      limit: 10,
      // don't want to send all events -- what if there are thousands?
      offset: page * 10 || 0,
      // so we can get a particular slice of events
      // page is 0-indexed
      include: [{
        model: db.User,
        attributes: ['username'],
      },
      {
        model: db.Comment,
        attributes: ['body'],
        include: [{
          model: db.User,
          attributes: ['username'],
        }],
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
  on GET /events/category/:categoryId
  see getEventsByUser, except by category here
  */
  getCategory(req, res) {
    const { categoryId } = req.params;
    const { page, sortBy } = req.query;
    db.Event.findAll({
      where: categoryId === 'all' ? { private: false } : { CategoryId: categoryId, private: false },
      // we don't want private events here
      order: [[sortBy || 'time', 'DESC']],
      limit: 10,
      offset: page * 10 || 0,
      include: [{
        model: db.User,
        attributes: ['username'],
      },
      {
        model: db.Comment,
        attributes: ['body'],
        include: [{
          model: db.User,
          attributes: ['username'],
        }],
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
    category (string name),
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
    let category;
    db.Category.findOne({ where: { name: body.category } })
      .then((foundCategory) => {
        category = foundCategory;
        return db.Event.create(body);
      })
      .then((event) => {
        // need to associate event with creating user immediately
        event.setUser(user);
        event.setCategory(category);
        // doesn't actually save
        return event.save();
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
      .then((comment) => {
        if (comment) {
          comment.deleteThread()
            .then(() => res.send(200));
        }
        res.send(403);
      })
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
      .then((comment) => {
        if (comment) {
          comment.update({ body })
            .then(() => res.send(200));
        }
        res.send(403);
      })
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
        return res.send(403);
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
      .then((event) => {
        if (event) {
          event.update(body)
            .then(() => res.send(200));
        }
        res.send(403);
      })
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
      .then((interestedEvent) => {
        if (interestedEvent) {
          interestedEvent.update({ rsvp: body.rsvp })
            .then(() => res.send(200));
        } else {
          res.send(403);
        }
      })
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
      .then((destroyedCount) => {
        if (destroyedCount) res.send(200);
        res.send(403);
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  getCategories
  on GET /category
  fetches names of all categories with their associations
  */
  getCategories(req, res) {
    return db.Category.findAll({
      include: [{
        model: db.Category,
        as: 'ParentCategory',
      }],
    })
      .then(foundCategories => res.status(200).json(foundCategories))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  addCategory
  on PUT /category
  expects body => {
    name: <categoryName>
    [ParentCategory]: <categoryName>
  }
  if logged user has role "admin", allows creation of new category with optional ParentCategory
  */
  addCategory(req, res) {
    const { body } = req;
    return db.Category.create({ name: body.name })
      .then((newCategory) => {
        if (body.ParentCategory) {
          return db.Category.findOne({ where: { name: body.ParentCategory } })
            .then((parentCategory) => {
              newCategory.setParentCategory(parentCategory);
              return newCategory.save();
            })
            .then(savedCategory => res.status(200).json(savedCategory));
        }
        return res.status(200).json(newCategory);
      })
      .catch(err => errorHandler(req, res, err));
  },

  /*
  editCategory
  on PATCH /category
  expects body => {
    name: <categoryName>

    [newName]: <categoryName>
    OR
    [ParentCategory]: <categoryName>
  }
  if logged user has role "admin", allows editing category with new name or ParentCategory
  */
  editCategory(req, res) {
    const { body } = req;
    return db.Category.findOne({ where: { name: body.name } })
      .then((foundCategory) => {
        if (body.newName) return foundCategory.update({ name: body.newName });
        foundCategory.setParentCategory(body.ParentCategory);
        return foundCategory.save();
      })
      .then(updatedCategory => res.status(200).json(updatedCategory))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  deleteCategory
  on DELETE /category
  expects body => {
    name: <categoryName>
  }
  if logged user has role "admin", allows deleting category with given name
  */
  deleteCategory(req, res) {
    const { body } = req;
    return db.Category.destroy({ where: { name: body.name } })
      .then(destroyedCount => res.status(200).send(destroyedCount))
      .catch(err => errorHandler(req, res, err));
  },

  /*
  getRsvpByUser
  on GET /user/rsvp
  finds all InterestedEvents associated with user, with event titles
  response body => [InterestedEvent]
  */
  getRsvpByUser(req, res) {
    const { user } = req;
    return user.getEvents()
      .then(interestedEvents => res.status(200).json(interestedEvents))
      .catch(err => errorHandler(req, res, err));
  },

  // /*
  // emailSender
  // on POST /events/:eventId/invite
  // expects body => {
  //   emails: [String]
  // }
  // sends email to each address in array with direct link to event
  // */
  // emailSender(req, res) {
  //   const { eventId } = req.params;
  //   const { emails } = req.body;
  //   const { user } = req;
  //   return db.Event.findOne({ where: { id: eventId, UserId: user.id } })
  //     .then(foundEvent => invitation(emails, foundEvent))
  //     .then((sentEmail) => {
  //       console.info(sentEmail);
  //       res.status(201).send('Email sent!');
  //     })
  //     .catch(err => errorHandler(err));
  // },
};

module.exports = requestHandler;
