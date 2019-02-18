/* global describe, context, before, it */
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const UserModel = require('../server/models/user');
const EventModel = require('../server/models/event');

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

    context('indexes', () => {
      ['username', 'email', 'telephone'].forEach(checkUniqueIndex(User));
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
});
