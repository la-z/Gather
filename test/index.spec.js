/* global describe, beforeEach, afterEach, it */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
require('dotenv').config({ path: './.env' });
const { expect } = require('chai');
const { user, event } = require('../server/models/index');
const db = require('../server/db/config');

describe('db', () => {
  // tests db methods in isolation of server
  describe('User', () => {
    beforeEach((done) => {
      user.save({ id: 1, username: 'alexa', password: '1234' })
        .then(() => done())
        .catch(err => done(err));
    });
    afterEach((done) => {
      user.delete(1)
        .then(() => done())
        .catch(err => done(err));
    });
    it('should store users in the database', (done) => {
      db.User.find({})
        .then((queryResult) => {
          expect(queryResult).to.exist;
          expect(queryResult.username).to.equal('alexa');
          done();
        })
        .catch(err => done(err));
    });
    it('should remove users from the database', (done) => {
      user.delete(1)
        .then((removed) => {
          expect(removed).to.equal(1);
          return db.User.findAndCountAll({});
        })
        .then((queryResult) => {
          expect(queryResult.count).to.equal(0);
          done();
        })
        .catch(err => done(err));
    });
  });
});
