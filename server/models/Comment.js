module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.STRING,
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Event);
    Comment.belongsTo(models.Comment, { as: 'parentComment' });
  };
  return Comment;
};
