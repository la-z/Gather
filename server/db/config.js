require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING, // needs hashing
  email: Sequelize.STRING,
  telephone: Sequelize.STRING,
});

const Event = sequelize.define('event', {
  category: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  private: Sequelize.BOOLEAN,
  time: Sequelize.DATE,
  lat: Sequelize.NUMERIC,
  long: Sequelize.NUMERIC,
});

const InterestedEvent = sequelize.define('interested_event', {
  rsvp: Sequelize.BOOLEAN,
});

const Comment = sequelize.define('comment', {
  body: Sequelize.STRING,
});

const ReplyComment = sequelize.define('reply_comment', {
  body: Sequelize.STRING,
});

const Group = sequelize.define('group', {
  name: Sequelize.STRING,
});

// creating foreign keys

Event.hasOne(User);
Event.belongsToMany(User, { through: InterestedEvent });
User.belongsToMany(Event, { through: InterestedEvent });
Comment.hasOne(Event);
Comment.hasOne(User);
ReplyComment.hasOne(Comment);
ReplyComment.hasOne(User);
Group.belongsToMany(User, { through: 'groupsUsers' });
User.belongsToMany(Group, { through: 'groupsUsers' });

module.exports = {
  User,
  Event,
  InterestedEvent,
  Comment,
  ReplyComment,
  Group,
};

sequelize.sync();
