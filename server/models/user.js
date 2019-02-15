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
rsvpEvent
finds entry in InterestedEvent corresponding to given user and event
flips InterestedEvent instance's rsvp property, saves to db
@params
  userModel: Sequelize.Model
  eventModel: Sequelize.Model
returns: Promise (updated InterestedEvent)
*/
