/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Card, Col, Button } from 'react-materialize';

const EventListEntry = ({ event, renderClickedEventTitle, loggedin }) => (
  <Col s={12} m={4}>
    <Card className="card">
      <h4 className="clickable" onClick={() => renderClickedEventTitle(event)}>{event.title}</h4>
      <h4>{event.category}</h4>
      <p>{event.description}</p>
      <p>{event.time}</p>
      {/* 
      Would be nice to have a conitional that makes this show up only on the MyEvents Page
      <button>Delete</button> 
      */}
      {loggedin ? <div><Button>Intersted</Button> <Button>Going</Button> <Button>Attended</Button></div> : <div></div>}
    </Card>
  </Col>
);
export default EventListEntry;
