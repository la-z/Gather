module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Event, { through: models.EventCategories });
    // Category.hasMany(models.Event);
    Category.belongsTo(models.Category, { as: 'ParentCategory', constraints: false });
  };

  return Category;
};
