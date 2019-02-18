module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('interestedEvent', {
    rsvp: { type: DataTypes.BOOLEAN, default: false },
  });

  return InterestedEvent;
};
