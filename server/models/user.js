const Sequelize = require('sequelize');
const { User, InterestedEvent } = require('../db/config');

/*
save
creates new instance of User model and saves in db
@params
  options => object
    username: string
    password: string (hashed)
    email: string
    telephone: string
returns: Promise (new Model)
*/
module.exports.save = ({
  username,
  password,
  email,
  telephone,
}) => User.create({
  username,
  password,
  email,
  telephone,
});

/*
followEvent
creates new entry in table InterestedEvent, linking user and event
initializes "rsvp" to false
@params
  userId: Integer
  eventModel: Sequelize.Model
returns: Promise (new InterestedEvent)
*/
module.exports.followEvent = (userId, eventModel) => InterestedEvent.create({
  user_id: userId,
  event_id: eventModel.get('id'),
  rsvp: false,
});

/*
unfollowEvent
deletes the entry in InterestedEvent corresponding to given user and event
@params
  userId: Integer
  eventModel: Sequelize.Model
returns: Promise (Integer -- number of rows deleted (should always be 1))
*/

module.exports.unfollowEvent = (userId, eventModel) => InterestedEvent.destroy({
  where: {
    user_id: userId,
    event_id: eventModel.id,
  },
});

/*
rsvpEventToggle
finds entry in InterestedEvent corresponding to given user and event
flips InterestedEvent instance's rsvp property, saves to db
@params
  userId: Integer
  eventModel: Sequelize.Model
returns: Promise (Array: number updated rows, updated InterestedEvent)
*/
module.exports.rsvpEventToggle = (userId, eventModel) => InterestedEvent.update({ rsvp: Sequelize.literal('NOT rsvp') },
  {
    where: {
      user_id: userId,
      event_id: eventModel.id,
    },
    returning: true, // forces sequelize to return affected rows with postgres, default false
    limit: 1, // just in case somehow multiple instances match (should never be the case)
  });
