require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./helpers/session')(passport);

const PORT = process.env.PORT || 1128;
const requestHandler = require('./helpers/request-handler');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.get('/insertSomethingHere', (req, res, next) => {
  requestHandler(req, res, next);
});
app.post('/login', passport.authenticate('local', {
  successRedirect: '/alexa/profile',
  failureRedirect: '/',
  failureFlash: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
