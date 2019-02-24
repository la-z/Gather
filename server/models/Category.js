module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Event);
    Category.belongsTo(models.Category, { as: 'ParentCategory', constraints: false });
    Category.hasMany(models.Category, { as: 'ChildCategory', constraints: false });
  };

  return Category;
};
