/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    private: { type: DataTypes.BOOLEAN, defaultValue: false },
    time: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    // duration in minutes
    lat: { type: DataTypes.NUMERIC, allowNull: false },
    long: { type: DataTypes.NUMERIC, allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: models.InterestedEvent });
    // this gives instances of Event the methods getUsers, setUsers, addUser, and addUsers
    Event.belongsTo(models.User, { constraints: false });
    Event.hasMany(models.Comment);
    Event.belongsToMany(models.Category, { through: models.EventCategories });
    // Event.hasMany(models.Category, { constraints: false });
  };

  return Event;
};
