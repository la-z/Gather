require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./helpers/session')(passport);

const PORT = process.env.PORT || 1128;
const requestHandler = require('./helpers/request-handler');
const { checkAuthentication } = require('./helpers/auth');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: '29187264' }));
// literally just random numbers
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../react-client/dist')));

app.get('/users/:username/profile', checkAuthentication, requestHandler.getProfile);

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
}), (req, res) => {
  res.redirect(`/users/${req.user.username}/profile`);
});

app.get('/logout', requestHandler.logout);

app.post('/signup', requestHandler.signup);

app.all('*', (req, res) => {
  console.log('idk what happened');
  res.send(500, 'That was strange');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
