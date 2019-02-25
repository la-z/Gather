/* eslint react/prop-types: 0 */
import React from 'react';
import Map from './map.jsx';
import CommentBox from './CommentBox.jsx';
import axios from 'axios';
import moment from 'moment';
import { Row, Col } from 'react-materialize';

class CurrentlyClickedEvent extends React.Component {
  constructor(props) {
    super(props);
    const { event } = this.props;
    this.state = {
      event,
    };
    this.reverseGeocodingRequest = this.reverseGeocodingRequest.bind(this);
  }

  componentDidMount() {
    const { event } = this.state;
    this.reverseGeocodingRequest();
    console.log(moment(event.time).toLocaleString().slice(15));
    this.setState({ 
      date: moment(event.time).toLocaleString().slice(0, -18),
      time: moment(event.time).toLocaleString().slice(15),
    });
  }

  reverseGeocodingRequest() {
    const { event } = this.props;
    axios.get(`http://api.mapbox.com/geocoding/v5/mapbox.places/${event.long}, ${event.lat}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
      .then(({ data }) => {
        const address = data.features[0].place_name;
        this.setState({ address: address.slice(0, -15) });
      });
  }
  
  render() {
    const { event, address, date, time } = this.state;
    return (
      <Row className="event-page">
      <div>
        <h3>{event.title}</h3>
        <h4>{event.category}</h4>
        <p>{address}</p>
        <p>{event.description}</p>
        <p>When: {date}
          <br />
                 {time}</p>
        {/* 
          event.private ? <p>This is a private Event</p> : <p>This is Public Event</p>
         */}
         <Col s={12} m={6}>
        <CommentBox 
          event={this.props.event} 
          username={this.props.username} 
          eventID={this.props.event.id} 
          comments={this.props.event.comments}
          redirect={this.props.redirect}
        />
        </Col>
        <Col s={12} m={6}>
        <Map event={event} />
        </Col>
      </div>
      </Row>
    );
  }
}
export default CurrentlyClickedEvent;
