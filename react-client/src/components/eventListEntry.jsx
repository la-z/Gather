import React from 'react';
const EventListEntry = ({event}) => (
  <div>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
  </div>
);
export default EventListEntry;