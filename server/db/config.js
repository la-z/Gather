require('dotenv').config();

const fs = require('fs');

const pg = require('pg');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING, // needs hashing
  email: Sequelize.STRING,
  telephone: Sequelize.STRING
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
  id_comment: {
    type: Sequelize.INTEGER,
    references: {
      model: Comment,
      key: 'id',
    }
  }
});

const Group = sequelize.define('group', {
  name: Sequelize.STRING,
});

// creating foreign keys



module.exports = {
  User,
  Event,
  FollowedEvent,
  Comment,
  ThreadComment,
  Group,
  GroupsUsers
};

User.create({username: 'alexa', password: 'hello'});