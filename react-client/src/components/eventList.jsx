/* eslint react/prop-types: 0 */
import React from 'react';
import EventListEntry from './eventListEntry.jsx';

const EventList = ({ events, renderClickedEventTitle }) => (
  <div className="events-list">
    <span id="events-list-title">EventList</span>
    {events.map(event => <EventListEntry key={event.title} event={event} renderClickedEventTitle={renderClickedEventTitle} />)}
  </div>
);
export default EventList;
