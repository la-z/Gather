/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Card, Col, Button } from 'react-materialize';
import axios from 'axios';

class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const { event } = this.props;
    const params = { rsvp: e.target.innerHTML };
    axios.put(`/events/${event.id}/rsvp`, params)
      .then((res) => { console.log(res); })
      .catch(err => {
        // if status code is 401 it already exists
        // prompt the user for an update?
        console.log(err)
      })
  }

  render() {
    const { event, renderClickedEventTitle, loggedin } = this.props;
    return (
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
          {loggedin ? (
            <div>
              <Button onClick={this.clickHandler}>interested</Button>
              <Button onClick={this.clickHandler}>going</Button>
              <Button onClick={this.clickHandler}>attended</Button>
            </div>
          )
            : <div />
          }
        </Card>
      </Col>
    );
  }
}

export default EventListEntry;
