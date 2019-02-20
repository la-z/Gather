/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    time: DataTypes.DATE,
    lat: DataTypes.NUMERIC,
    long: DataTypes.NUMERIC,
  });

  Event.prototype.togglePrivate = function () {
    this.update({ private: !this.private });
  };

  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: models.InterestedEvent });
    // this gives instances of Event the methods getUsers, setUsers, addUser, and addUsers
    Event.hasOne(models.User, { constraints: false });
  };

  return Event;
};
