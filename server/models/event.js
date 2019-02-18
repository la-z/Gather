module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    time: DataTypes.DATE,
    lat: DataTypes.NUMERIC,
    long: DataTypes.NUMERIC,
  });
};
