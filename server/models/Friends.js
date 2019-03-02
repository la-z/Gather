/* eslint-disable func-names */

module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false },
  });
  Friends.associate = (models) => {
    Friends.belongsToMany(models.User, {through: 'username'});
    // Friends.hasMany(models.User, { constraints: false });
  };
  // Friends.sync();
  return Friends;
};
