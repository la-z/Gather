/* global describe, beforeEach */
require('dotenv').config({ path: './.env' });
const { user, event, comment } = require('../server/models/index');
const db = require('../server/db/config');
const should = require('chai').should();

describe('db', () => {
  beforeEach((done) => {
    Promise.all(Object.values(db).map(model => model.truncate()))
      .then(() => Promise.all([user.save({ username: 'alexa', password: 1234 }), event.save({ category: 'ham', title: 'spam', description: 'ham and spam' })]))
      .then(([newUser, newEvent]) => user.followEvent({ userId: newUser.id, newEvent }))
      .then(() => done());
  });
});
