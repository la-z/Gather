const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy((username, password, done) => {
  // passport needs to "use" a "strategy" http://www.passportjs.org/docs/configure/
    db.User.findOne({ where: { username } })
      .then((user) => {
        if (user) return user.checkPassword(password);
      })
      .then((isValid) => {
        if (isValid) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => done(err));
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  // saves user id on session

  passport.deserializeUser((id, done) => {
    db.User.findById(id, done);
  });
  // associates session with user
};
