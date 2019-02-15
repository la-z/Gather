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
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
});

const InterestedEvent = sequelize.define('interested_event', {
  rsvp: Sequelize.BOOLEAN,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    }
  }
});

const Comment = sequelize.define('comment', {
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    }
  }
});

const ReplyComment = sequelize.define('reply_comment', {
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
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

const GroupsUsers = sequelize.define('groups_users', {
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_group: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    }
  }
});

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