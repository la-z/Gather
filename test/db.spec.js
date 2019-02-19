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
const UserModel = require('../server/models/user');
const EventModel = require('../server/models/event');
const CommentModel = require('../server/models/comment');
const InterestedEventModel = require('../server/models/interestedEvent');

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

    it('defined a hasOne association with User', () => {
      expect(Event.hasOne).to.have.been.calledWith(User);
    });

    it('defined a belongsToMany association with User through InterestedEvent', () => {
      expect(Event.belongsToMany).to.have.been.calledWith(User, {
        through: InterestedEvent,
      });
    });
  });
  it('has a method called tooglePrivate that toggles the \'private\' boolean property', () => {
    event.private = false;
    event.togglePrivate();
    expect(event.update).to.have.been.calledOnceWith({ private: true });
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

    it('defined a hasOne association with User', () => {
      expect(Comment.hasOne).to.have.been.calledWith(User);
    });

    it('defined a hasOne association with Event', () => {
      expect(Comment.hasOne).to.have.been.calledWith(Event);
    });

    it('defined a hasOne association with Comment as parentComment', () => {
      expect(Comment.hasOne).to.have.been.calledWith(Comment, {
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

  it('should have a method toggleRsvp that toggles the \'rsvp\' boolean property', () => {
    interestedEvent.rsvp = false;
    interestedEvent.toggleRsvp();
    expect(interestedEvent.update).to.have.been.calledOnceWith({ rsvp: true });
  });
});
