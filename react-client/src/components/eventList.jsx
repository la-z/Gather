/* eslint react/prop-types: 0 */
import React from 'react';
import EventListEntry from './eventListEntry.jsx';

const EventList = ({ events }) => (
  <div>
    <h2>EventList</h2>
    {events.map(event => <EventListEntry key={event.title} event={event} />)}
  </div>
);
export default EventList;
