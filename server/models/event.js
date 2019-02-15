const { Event } = require('../db/config');

/*
save
creates a new Event and saves to db
@params
  options => object
    category: String
    title: String
    description: String
    time: Datetime
    lat: Float
    long: Float
    isPrivate: Bool
    user_id: Integer
returns: Promise (new Model)
*/

module.exports.save = ({
  category,
  title,
  description,
  time,
  lat,
  long,
  isPrivate,
  user_id,
}) => {

};
