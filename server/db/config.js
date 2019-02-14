require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING, // needs hashing
  email: Sequelize.STRING,
  telephone: Sequelize.STRING,
});

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  private: Sequelize.BOOLEAN,
  time: Sequelize.DATE,
  lat: Sequelize.NUMERIC,
  long: Sequelize.NUMERIC,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

const InterestedEvent = sequelize.define('interested_event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rsvp: Sequelize.BOOLEAN,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
  },
});

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
  },
});

const ReplyComment = sequelize.define('reply_comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  id_comment: {
    type: Sequelize.INTEGER,
    references: {
      model: Comment,
      key: 'id',
    },
  },
});

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
});

const GroupsUsers = sequelize.define('groups_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  id_group: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
});

module.exports = {
  User,
  Event,
  InterestedEvent,
  Comment,
  ReplyComment,
  Group,
  GroupsUsers,
};
