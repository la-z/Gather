/* global describe, beforeEach, it */
/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env' });
const { expect } = require('chai');
const { user, event, comment } = require('../server/models/index');
const db = require('../server/db/config');

describe('db', () => {
  // tests db methods in isolation of server
  beforeEach((done) => {
    Promise.all([db.User, db.Event, db.InterestedEvent]
      .map(model => model.truncate({ cascade: true })))
      .then(() => Promise.all([user.save({ username: 'alexa', password: 1234 }), event.save({ category: 'ham', title: 'spam', description: 'ham and spam' })]))
      .then(([newUser, newEvent]) => user.followEvent(newUser.id, newEvent))
      .then(() => done())
      .catch(err => console.error(err));
  });

  it('should store users in the database', (done) => {
    db.User.find({})
      .then((queryResult) => {
        expect(queryResult).to.exist;
        expect(queryResult.username).to.equal('alexa');
        done();
      });
  });
});
