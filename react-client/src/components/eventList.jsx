/* eslint react/prop-types: 0 */
import React from 'react';
import EventListEntry from './eventListEntry.jsx';

const EventList = ({ events, renderClickedEventTitle }) => (
  <div>
    <h2>EventList</h2>
    {events.map(event => <EventListEntry key={event.title} event={event} renderClickedEventTitle={renderClickedEventTitle} />)}
  </div>
);
export default EventList;
