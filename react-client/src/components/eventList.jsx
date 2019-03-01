/* eslint-disable react/prop-types, import/extensions */
import React from 'react';
import { Row } from 'react-materialize';
import EventListEntry from './eventListEntry.jsx';


const EventList = ({ events, renderClickedEventTitle, loggedin, togglePreloader, size }) => (
  <Row className="events-list">
    {events.map(event => (
      <EventListEntry
        key={event.title}
        event={event}
        renderClickedEventTitle={renderClickedEventTitle}
        loggedin={loggedin}
        togglePreloader={togglePreloader}
        size={size}
        // view={this.props.view}
      />
    ))}
  </Row>
);
export default EventList;
