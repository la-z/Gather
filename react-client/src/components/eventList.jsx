/* eslint-disable react/prop-types, import/extensions */
import React from 'react';
import { Row } from 'react-materialize';
import EventListEntry from './eventListEntry.jsx';


const EventList = ({ events, renderClickedEventTitle, loggedin, togglePreloader, size, getEvents, view }) => (
  <Row className="events-list">
    {events.map(event => (
      <EventListEntry
        key={event.title}
        event={event}
        renderClickedEventTitle={renderClickedEventTitle}
        loggedin={loggedin}
        togglePreloader={togglePreloader}
        size={size}
        getEvents={getEvents}
        view={view}
      />
    ))}
  </Row>
);
export default EventList;
