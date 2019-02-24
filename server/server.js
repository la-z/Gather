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
  getEvent,
  makeNewEvent,
  submitNewComment,
  deleteComment,
  editComment,
  deleteEvent,
  editEvent,
  deleteUser,
  rsvpEvent,
  updateRsvp,
  removeRsvp,
  addCategory,
  editCategory,
  deleteCategory,
} = require('./helpers/request-handler');
const { checkAuthentication, checkAdmin } = require('./helpers/auth');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: '29187264',
  cookie: {
    maxAge: 432000000, // 5 days
    resave: false, // fixes some issues with logout not happening
    saveUninitialized: false, // another fix
  },
}));
// literally just random numbers
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../react-client/dist')));

// login, signup, logout

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(201, {
    username: req.user.username,
    id: req.user.id,
  });
});

app.get('/logout', logout);

app.post('/signup', signup);

// users

app.delete('/users/:userId', checkAuthentication, deleteUser);

// categories

app.put('/category', checkAuthentication, checkAdmin, addCategory);

app.patch('/category', checkAuthentication, checkAdmin, editCategory);

app.delete('/category', checkAuthentication, checkAdmin, deleteCategory);

// events

app.get('/events/my-events', checkAuthentication, getEventsByUser);

app.get('/events/category/:categoryName', (req, res) => {
  getCategory(req, res);
});

app.get('/events/:eventId', checkAuthentication, getEvent);

app.put('/events', checkAuthentication, makeNewEvent);

app.patch('/events/:eventId', checkAuthentication, editEvent);

app.delete('/events/:eventId', checkAuthentication, deleteEvent);

// rsvp events

app.put('/events/:eventId/rsvp', checkAuthentication, rsvpEvent);

app.patch('/events/:eventId/rsvp', checkAuthentication, updateRsvp);

app.delete('/events/:eventId/rsvp', checkAuthentication, removeRsvp);

// comments

app.put('/events/:eventId/comments', checkAuthentication, submitNewComment);

app.put('/events/:eventId/comments/:commentId', checkAuthentication, submitNewComment);

app.patch('/events/:eventId/comments/:commentId', checkAuthentication, editComment);

app.delete('/events/:eventId/comments/:commentId', checkAuthentication, deleteComment);


app.all('*', (req, res) => {
  console.log('idk what happened');
  res.send(500, 'That was strange');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
