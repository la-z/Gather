/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('InterestedEvent', {
    rsvp: { type: DataTypes.ENUM('interested', 'going', 'attended') },
  });

  return InterestedEvent;
};
