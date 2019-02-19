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
  return User;
};
