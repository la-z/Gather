/* eslint-disable no-unused-expressions */
const db = require('../models');

const requestHandler = {
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
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
  getEventsByUser(req, res) {
    const { user } = req;
    // user is put directly on req by passport
    // user => object with props username, id
    const { page, sortBy } = req.params;
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
      .catch((err) => {
        console.error(err);
        res.send(500);
      });
  },

  getProfile(req, res) {
    res.send(200, 'welcome to your profile');
  },

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

  deleteComment(req, res) {
    const { user } = req;
    const { commentId } = req.params;
    db.Comment.findOne({ where: { id: commentId, userId: user.id } })
      .then(comment => comment.deleteThread())  
      .then(() => res.send(200))
      .catch((err) => {
        console.error(err);
        res.send(500);
      });
  },

  editComment(req, res) {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;
    db.Comment.findOne({ where: { id: commentId, userId: user.id } })
      .then(comment => comment.update({ body }))
      .then(() => res.send(200))
      .catch((err) => {
        console.error(err);
        res.send(500);
      });
  },

  deleteEvent(req, res) {
    const { user } = req;
    const { eventId } = req.params;
    db.Event.findOne({ where: { id: eventId, userId: user.id } })
  },

  editEvent(req, res) {

  },

  deleteUser(req, res) {

  },
};

module.exports = requestHandler;
