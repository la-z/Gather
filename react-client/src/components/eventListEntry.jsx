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
    this.state = {
      rsvpState : 'n/a',
      address: '',
    };
    // this.reverseGeocodingRequest = this.reverseGeocodingRequest.bind(this);
  }
  
  // componentDidMount() {
  //   this.reverseGeocodingRequest();
  // }

  updateRSVP(params, eventID) {
    axios.patch(`/events/${eventID}/rsvp`, params)
      .then((res) => { 
        console.log(res);
        this.setState({ rsvpState: params.rsvp });
      })
      .catch((err) => { console.log(err); });
  }

  clickHandler(e) {
    const { event } = this.props;
    const params = { rsvp: e.target.innerHTML };
    axios.put(`/events/${event.id}/rsvp`, params)
      .then((res) => { console.log(res); })
      .catch((err) => {
        // if status code is 401 it already exists
        // prompt the user for an update?
        // console.log(err);
        this.updateRSVP(params, event.id);
      });
  }

  // reverseGeocodingRequest() {
  //   // const { event } = this.props;
  //   // axios.get(`http://api.mapbox.com/geocoding/v5/mapbox.places/${event.long}, ${event.lat}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
  //   //   .then(({ data }) => {
  //   //     const address = data.features[0].place_name.slice(-15);
  //   //     this.setState({ address });
  //   //   });
  // }

  render() {
    const { event, renderClickedEventTitle, loggedin } = this.props;
    return (
      <Col s={12} m={4}>
        <Card className="card">
          <h4 className="clickable" onClick={() => renderClickedEventTitle(event)}>{event.title}</h4>
          <h4>{event.category}</h4>
          {/* <p> {this.state.address}</p> */}
          <p>{event.description}</p>
          <p>{event.time}</p>
          {/*
          Would be nice to have a conitional that makes this show up only on the MyEvents Page
          <button>Delete</button>
          */}
          {loggedin ? (
            <div>
              <Button className="orange darken-3" onClick={this.clickHandler}>interested</Button>
              <Button className="orange darken-3" onClick={this.clickHandler}>going</Button>
              <Button className="orange darken-3" onClick={this.clickHandler}>attended</Button>
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
