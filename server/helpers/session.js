const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy((username, password, done) => {
  // passport needs to "use" a "strategy" http://www.passportjs.org/docs/configure/
    db.User.findOne({ where: { username } })
      .then((user) => {
        if (user) return user.checkPassword(password);
        return [false, null];
      })
      .then(([isValid, user]) => {
        if (isValid) {
          return done(null, { username: user.username, id: user.id });
        }
        return done(null, false);
      })
      .catch(err => done(err));
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  // saves user id on session

  passport.deserializeUser((id, done) => db.User.findOne({ where: { id } })
    .then(user => done(null, user))
    .catch(err => done(err)));
  // associates session with user
};
