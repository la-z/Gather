/* global describe, before, after, it, context */
/* eslint-disable no-unused-expressions */

// these are LIVE TESTS that deal with the actual database!
// as such, they are subject to some unpredictable behavior
// if the testing username actually becomes taken, the tests will fail to function
const request = require('supertest');
const session = require('supertest-session');
const chai = require('chai');
const app = require('../server/server');
const db = require('../server/models');

const { expect } = chai;
let testSession = session(app);
let authenticatedSession;

before(() => {
  testSession = session(app);
});

const newUser = {
  username: 'barf',
  password: 'sampson',
};

describe('signup', () => {
  before((done) => {
    db.User.destroy({ where: { username: newUser.username } })
      .then(() => {
        testSession.post('/signup')
          .send(newUser)
          .expect(302)
          .end((err) => {
            if (err) {
              return done(err);
            }
            authenticatedSession = testSession;
            return done();
          });
      })
      .catch(err => done(err));
  });

  after((done) => {
    db.User.destroy({ where: { username: newUser.username } })
      .then(() => done())
      .catch(err => done(err));
  });

  it('should store a new user in the db with a hashed password', (done) => {
    db.User.findOne({ where: { username: newUser.username } })
      .then(foundUser => foundUser.checkPassword(newUser.password, foundUser.password))
      .then((isValidPass) => {
        expect(isValidPass[0]).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('should redirect a user to / if their username is already taken', (done) => {
    request(app)
      .post('/signup')
      .send(newUser)
      .expect(302)
      .expect('Location', '/')
      .end(done);
  });
  it('should assign a session object to the new user on signup', (done) => {
    authenticatedSession.cookies.find((cookie) => {
      expect(cookie).to.exist;
      return done();
    });
  });
});

describe('login', () => {
  before((done) => {
    request(app)
      .post('/signup')
      .send(newUser)
      .expect(302, done);
  });

  it('should redirect a user to /:username/profile on a successful login', (done) => {
    request(app)
      .post('/login')
      .send(newUser)
      .expect(302)
      .expect('Location', `/users/${newUser.username}/profile`, done);
  });

  it('should redirect a user to / on a failed login', (done) => {
    request(app)
      .post('/login')
      .send({
        username: 'blarney',
        password: 'bingleborfs',
      })
      .expect(302)
      .expect('Location', '/', done);
  });

  it('should associate a login with a new session', (done) => {
    testSession.post('/login')
      .send(newUser)
      .then(() => {
        authenticatedSession = testSession;
        return authenticatedSession.cookies.find((cookie) => {
          expect(cookie).to.exist;
          return done();
        });
      });
  });
});

describe('session persistence', () => {
  before((done) => {
    db.User.destroy({ where: { username: newUser.username } })
      .then(() => db.User.create(newUser))
      .then(() => {
        request(app)
          .get('/logout')
          .end(done);
      });
  });

  after((done) => {
    db.User.destroy({ where: { username: newUser.username } })
      .then(() => done());
  });

  context('unauthenticated users', () => {
    it('should not allow unauthorized users access to create new events', (done) => {
      request(app)
        .put('/events')
        .send({ category: 'tabletop', title: 'a', description: 'b' })
        .expect(403, done);
    });
  });
});
