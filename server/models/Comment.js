/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: { type: DataTypes.STRING, allowNull: false },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Event);
    Comment.belongsTo(models.Comment, { as: 'ParentComment' });
  };

  /*
  deleteThread
  deletes a comment and any possible children
  @return: Promise(number rows destroyed)
  */
  Comment.prototype.deleteThread = function () {
    return Comment.destroy({
      where: {
        [sequelize.Op.or]: [
          { ParentCommentId: this.id },
          { id: this.id },
        ],
      },
    });
  };

  return Comment;
};
