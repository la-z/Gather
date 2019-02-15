const User = require('../db/config');

/*
save
creates new instance of User model and saves in db
@params
  options => object
    username: string
    password: string (hashed)
    email: string
    telephone: string
returns: Promise (new Model)
*/
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

module.exports.followEvent