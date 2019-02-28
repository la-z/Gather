/* eslint-disable func-names, no-param-reassign, arrow-body-style */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    telephone: DataTypes.STRING,
    role: { type: DataTypes.ENUM(['user', 'admin']), defaultValue: 'user' },
  });

  User.beforeCreate((user) => {
    // beforeCreate happens before a new instance is saved
    return user.hashPassword(user.password)
      .then((hash) => {
        user.password = hash;
      });
  });

  User.associate = (models) => {
    User.belongsToMany(models.Event, { through: models.InterestedEvent });
    // this gives instances of User the methods getEvents, setEvents, addEvent, and addEvents
    User.belongsToMany(models.Friends, { through: 'username' });
    User.hasMany(models.Event, { constraints: false });
    User.hasMany(models.Friends);
    console.log(models)
    User.hasMany(models.Comment);
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
    return bcrypt.compare(plainTextPassword, this.password)
      .then(isValid => [isValid, this]);
  // ugly hack to pass the user model along to our login handler
  };

  return User;
};
