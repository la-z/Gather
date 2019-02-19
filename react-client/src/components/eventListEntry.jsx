import React from 'react';
const EventListEntry = ({event}) => (
  <div>
    <h3>{event.title}</h3>
    <h4>{event.time}</h4>
    <p>{event.description}</p>
  </div>
);
export default EventListEntry;