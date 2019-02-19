/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('InterestedEvent', {
    rsvp: { type: DataTypes.BOOLEAN, default: false },
  });

  InterestedEvent.prototype.toggleRsvp = function () {
    this.update({ rsvp: !this.rsvp });
  };

  return InterestedEvent;
};
