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
  getEvent(req, res) {

  },
  getCategory(req, res) {

  },
  getProfile(req, res) {
    res.send(200, 'welcome to your profile');
  },
  getNewEvent(req, res) {

  },
  makeNewEvent(req, res) {

  },
  submitNewComment(req, res) {

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
