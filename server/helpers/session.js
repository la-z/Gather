const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.use(new LocalStrategy((username, password, done) => {
  // passport needs to "use" a "strategy" http://www.passportjs.org/docs/configure/
  db.Users.findOne({ username })
    .then(user => user.checkPassword(password))
    .then((isValid) => {
      if (isValid) {
        return done(null, user);
      }
      return done(null, false, { message: 'Incorrect username or password.' });
    })
    .catch(err => done(err));
}));
