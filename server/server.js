require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./helpers/session')(passport);

const PORT = process.env.PORT || 1128;
const {
  logout,
  signup,
  getEventsByUser,
  getCategory,
  getProfile,
  makeNewEvent,
  submitNewComment,
  deleteComment,
  editComment,
  deleteEvent,
  editEvent,
  deleteUser,
} = require('./helpers/request-handler');
const { checkAuthentication } = require('./helpers/auth');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: '29187264' }));
// literally just random numbers
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../react-client/dist')));

// login, signup, logout

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
}), (req, res) => {
  res.redirect(`/users/${req.user.username}/profile`);
});

app.get('/logout', logout);

app.post('/signup', signup);

// delete user

app.delete('/users/:userId', checkAuthentication, deleteUser);

// events

app.get('/events/category/:categoryName', (req, res) => {
  getCategory(req, res);
});

app.put('/events', checkAuthentication, makeNewEvent);

app.patch('/events/:eventId', checkAuthentication, editEvent);

app.delete('/events/:eventId', checkAuthentication, deleteEvent);

// comments

app.put('/events/:eventId/comments', checkAuthentication, submitNewComment);

app.put('/events/:eventId/comments/:commentId', checkAuthentication, submitNewComment);

app.patch('/events/:eventId/comments/:commentId', checkAuthentication, editComment);

app.delete('/events/:eventId/comments/:commentId', checkAuthentication, deleteComment);

app.get('/users/:username/profile', checkAuthentication, getProfile);

app.all('*', (req, res) => {
  console.log('idk what happened');
  res.send(500, 'That was strange');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
