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
  userModel: Sequelize.Model
  eventModel: Sequelize.Model
returns: Promise (new InterestedEvent)
*/
module.exports.followEvent = (userModel, eventModel) => InterestedEvent.create({
  user_id: userModel.get('id'),
  event_id: eventModel.get('id'),
  rsvp: false,
});

/*
rsvpEventToggle
finds entry in InterestedEvent corresponding to given user and event
flips InterestedEvent instance's rsvp property, saves to db
@params
  userModel: Sequelize.Model
  eventModel: Sequelize.Model
returns: Promise (Array: number updated rows, updated InterestedEvent)
*/
module.exports.rsvpEventToggle = (userModel, eventModel) => InterestedEvent.update({ rsvp: Sequelize.literal('NOT rsvp') },
  {
    where: {
      user_id: userModel.id,
      event_id: eventModel.id,
    },
    returning: true, // forces sequelize to return affected rows with postgres, default false
    limit: 1, // just in case somehow multiple instances match (should never be the case)
  });
