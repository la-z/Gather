/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: { type: DataTypes.BOOLEAN, default: false },
    time: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    // duration in minutes
    lat: DataTypes.NUMERIC,
    long: DataTypes.NUMERIC,
<<<<<<< HEAD
    done: { type: DataTypes.BOOLEAN, default: false },
=======
    done: DataTypes.BOOLEAN,
>>>>>>> cdabe0abd0e36727f7012318f8fcf8a16e452917
  });

  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: models.InterestedEvent });
    // this gives instances of Event the methods getUsers, setUsers, addUser, and addUsers
    Event.belongsTo(models.User, { constraints: false });
  };

  return Event;
};
