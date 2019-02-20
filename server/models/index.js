const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const models = [
  'User',
  'Event',
  'InterestedEvent',
  'Comment',
];

models.forEach((model) => {
  db[model] = sequelize.import(`${__dirname}/${model}`);
});

models.forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
