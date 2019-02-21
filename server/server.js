require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./helpers/session')(passport);

const PORT = process.env.PORT || 1128;
const requestHandler = require('./helpers/request-handler');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: '29187264' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.get('/insertSomethingHere', (req, res, next) => {
  requestHandler(req, res, next);
});

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true,
}), (req, res) => res.redirect(`/${req.user.username}/profile`));

app.get('/logout', requestHandler.logout);

app.post('/signup', requestHandler.signup);

app.all('*', (req, res) => {
  console.log('idk what happened');
  res.send(500, 'That was strange');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
