/* eslint-disable func-names, no-param-reassign */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING, // needs hashing
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (user) => {
        // beforeCreate happens before a new instance is saved
        user.hashPassword(user.password)
          .then((hash) => {
            user.password = hash;
          });
      },
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Event, { through: models.InterestedEvent });
    // this gives instances of User the methods getEvents, setEvents, addEvent, and addEvents
    User.hasMany(models.Event);
  };

  /*
  hashPassword
  hashes a password using bcrypt
  *** does not save hash on user model ***
  @params
  plainTextPassword: String
  @return
    Promise(hash)
  */
  User.prototype.hashPassword = function (plainTextPassword) {
    return bcrypt.hash(plainTextPassword, 10);
    // 10 is for complexity of salt generated
  };

  /*
  checkPassword
  compares a password to the user's hash
  @params
    plainTextPassword: String
  @return
    Promise(bool)
  */
  User.prototype.checkPassword = function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
  };

  return User;
};
