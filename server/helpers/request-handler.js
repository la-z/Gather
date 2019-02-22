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
    const { page, sortBy } = req.params;
    db.Event.find({
      where: { userId: user.id },
      order: sortBy,
      limit: 10,
      offset: page * 10,
      include: [db.User.username],
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      });
  },
  getCategory(req, res) {
    const { category, page, sortBy } = req.params;
    db.Event.find({
      where: { category, private: false },
      attributes: ['title', 'description', 'time'],
      order: sortBy,
      limit: 10,
      offset: page * 10,
      include: [db.User.username],
    })
      .then((events) => {
        res.status(200);
        res.json(events);
      });
  },
  getProfile(req, res) {
    res.send(200, 'welcome to your profile');
  },
  makeNewEvent(req, res) {
    const { body } = req.body;
    const { username } = req.user;
    let newEvent;
    db.Event.create(body)
      .then((event) => {
        newEvent = event;
        return db.User.find({ where: { username } });
      })
      .then((foundUser) => {
        newEvent.setUser(foundUser);
        return newEvent.save();
      })
      .then(() => res.send(200));
  },

  submitNewComment(req, res) {
    const { eventName } = req.params;
    const { user, body } = req;
    let newComment;
    db.Comment.create(body)
      .then((comment) => {
        newComment = comment;
        return db.User.find({ where: { username: user.username } });
      })
      .then((foundUser) => {
        newComment.setUser(foundUser);
        return db.Event.find({ where: { title: eventName } });
      })
      .then((event) => {
        newComment.setEvent(event);
        return newComment.save();
      })
      .then(() => res.send(200));
  },

  deleteComment(req, res) {

  },
  editComment(req, res) {

  },
  deleteEvent(req, res) {

  },
  editEvent(req, res) {

  },
  deleteUser(req, res) {

  },
};

module.exports = requestHandler;
