module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.STRING,
  });
  Comment.associations = (models) => {
    Comment.hasOne(models.User);
    Comment.hasOne(models.Event);
    Comment.hasOne(models.Comment);
  };
  return Comment;
};
