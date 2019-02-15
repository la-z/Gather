const { Event } = require('../db/config');

/*
save
creates a new Event and saves to db
@params
  options => object
    category: String
    title: String
    description: String
    private: Bool
    time: Datetime
    lat: Float
    long: Float
    id_user: Integer
returns: Promise (new Model)
*/

module.exports.save = options => Event.create(options);
