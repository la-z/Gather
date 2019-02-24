/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint react/prop-types: 0 */
import React from 'react';

const EventListEntry = ({ event, renderClickedEventTitle }) => (
  <div>
    <h3 onClick={() => renderClickedEventTitle(event)}>{event.title}</h3>
    <h4>{event.category}</h4>
    <p>{event.description}</p>
    <p>{event.time}</p>
    {
      event.private ? <p>This is a private Event</p> : <p>This is NOT a private Event</p>
    }
  </div>
);
export default EventListEntry;
