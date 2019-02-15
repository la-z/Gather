const User = require('../db/config');

module.exports.save = ({
  username,
  password,
  email,
  telephone,
}) => User.create({
  username,
  password,
  email,
  telephone,
});
