/* global describe, context, before, it */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const UserModel = require('../server/models/User');
const EventModel = require('../server/models/Event');
const CommentModel = require('../server/models/Comment');
const InterestedEventModel = require('../server/models/InterestedEvent');

const { expect } = chai;
chai.use(sinonChai);


describe('User', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();
  checkModelName(user, 'User');
  // sequelize-test-helpers interfaces with chai and sinon to create assertions
  context('properties', () => {
    // context is literally an alias for describe to make test suites feel more hierarchical
    [
      'username',
      'password',
      'email',
      'telephone',
    ].forEach(checkPropertyExists(user));
  });
  context('associations', () => {
    const Event = 'just a dummy';
    const InterestedEvent = 'another dummy';

    before(() => {
      User.associate({ Event, InterestedEvent });
    });

    it('defined a hasMany association with Event', () => {
      expect(User.hasMany).to.have.been.calledWith(Event);
    });

    it('defined a belongsToMany association with Event through InterestedEvent', () => {
      expect(User.belongsToMany).to.have.been.calledWith(Event, {
        through: InterestedEvent,
      });
    });
  });
  context('methods', () => {
    it('should have a method hashPassword that sets the user\'s password property to a hashed version', (done) => {
      user.hashPassword('password123')
        .then((hash) => {
          expect(hash).to.exist;
          expect(hash).to.not.equal('password123');
          done();
        })
        .catch(err => done(err));
    });
    context('checkPassword', () => {
      it('should have a method checkPassword that compares a given password with the user\'s hashed password and returns true if they match', (done) => {
        user.hashPassword('password123')
          .then((hash) => {
            user.password = hash;
            return user.checkPassword('password123');
          })
          .then((isValid) => {
            expect(isValid[0]).to.be.true;
            done();
          })
          .catch(err => done(err));
      });
      it('should have a method checkPassword that compares a given password with the user\'s hashed password and returns false if they do not match', (done) => {
        user.hashPassword('password123')
          .then((hash) => {
            user.password = hash;
            return user.checkPassword('passwrod123');
          })
          .then((isValid) => {
            expect(isValid[0]).to.be.false;
            done();
          })
          .catch(err => done(err));
      });
    });
  });
});

describe('Event', () => {
  const Event = EventModel(sequelize, dataTypes);
  const event = new Event();
  checkModelName(event, 'Event');

  context('properties', () => {
    [
      'category',
      'title',
      'description',
      'private',
      'time',
      'lat',
      'long',
    ].forEach(checkPropertyExists(event));
  });

  context('associations', () => {
    const User = 'lol';
    const InterestedEvent = 'pls';
    

    before(() => {
      Event.associate({ User, InterestedEvent });
    });

    it('defined a belongsTo association with User', () => {
      expect(Event.belongsTo).to.have.been.calledWith(User);
    });

    it('defined a belongsToMany association with User through InterestedEvent', () => {
      expect(Event.belongsToMany).to.have.been.calledWith(User, {
        through: InterestedEvent,
      });
    });
  });
});

describe('Comment', () => {
  const Comment = CommentModel(sequelize, dataTypes);
  const comment = new Comment();
  checkModelName(comment, 'Comment');

  context('properties', () => {
    checkPropertyExists(comment)('body');
  });

  context('associations', () => {
    const User = 'another test dummy';
    const Event = 'not going';

    before(() => {
      Comment.associate({ User, Event, Comment });
    });

    it('defined a belongsTo association with User', () => {
      expect(Comment.belongsTo).to.have.been.calledWith(User);
    });

    it('defined a belongsTo association with Event', () => {
      expect(Comment.belongsTo).to.have.been.calledWith(Event);
    });

    it('defined a belongsTo association with Comment as parentComment', () => {
      expect(Comment.belongsTo).to.have.been.calledWith(Comment, {
        as: 'parentComment',
      });
    });
  });
});

describe('InterestedEvent', () => {
  const InterestedEvent = InterestedEventModel(sequelize, dataTypes);
  const interestedEvent = new InterestedEvent();

  context('properties', () => {
    checkPropertyExists(interestedEvent)('rsvp');
  });
});
