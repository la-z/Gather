import React from 'react';
import EventListEntry from './eventListEntry.jsx'
const EventList = (props) => (
  <div>
    <h2>EventList</h2>
    {props.events.map((event) => <EventListEntry key={event.title} event={event}/>)}
  </div>
);
export default EventList;