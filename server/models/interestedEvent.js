module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('InterestedEvent', {
    rsvp: { type: DataTypes.BOOLEAN, default: false },
  });

  InterestedEvent.prototype.toggleRsvp = () => {
    this.update({ rsvp: !this.get('rsvp') });
  };

  return InterestedEvent;
};
