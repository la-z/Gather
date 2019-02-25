/* eslint-disable react/prop-types, import/extensions */
import React from 'react';
import { Row } from 'react-materialize';
import EventListEntry from './eventListEntry.jsx';

const EventList = ({ events, renderClickedEventTitle, loggedin }) => (
  <Row className="events-list">
    {events.map(event => (
      <EventListEntry
        key={event.title}
        event={event}
        renderClickedEventTitle={renderClickedEventTitle}
        loggedin={loggedin}
      />
    ))}
  </Row>
);
export default EventList;
