/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('InterestedEvent', {
    rsvp: { type: DataTypes.ENUM('interested', 'going', 'attended') },
    username: { type: DataTypes.STRING, allowNull: false },
  });

  return InterestedEvent;
};
