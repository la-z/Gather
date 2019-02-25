/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Card, Col } from 'react-materialize';

const EventListEntry = ({ event, renderClickedEventTitle }) => (
  <Col s={12} m={4}>
    <Card className="card">
      <h4 onClick={() => renderClickedEventTitle(event)}>{event.title}</h4>
      <h4>{event.category}</h4>
      <p>{event.description}</p>
      <p>{event.time}</p>
    </Card>
  </Col>
);
export default EventListEntry;
