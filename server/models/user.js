/* eslint-disable func-names */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING, // needs hashing
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Event, { through: models.InterestedEvent });
    // this gives instances of User the methods getEvents, setEvents, addEvent, and addEvents
    User.hasMany(models.Event);
  };

  User.prototype.hashPassword = function (plainTextPassword) {
    bcrypt.hash(plainTextPassword, 10)
    // 10 is for complexity of salt generated
      .then((hash) => {
        this.password = hash;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  User.prototype.checkPassword = function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
  };

  return User;
};
