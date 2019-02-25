/* eslint react/prop-types: 0 */
import React from 'react';
import Map from './map.jsx';
import CommentBox from './CommentBox.jsx';
import axios from 'axios';

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
    this.reverseGeocodingRequest()
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
    const { event, address } = this.state;
    return (
      <div>
        <h3>{event.title}</h3>
        <h4>{event.category}</h4>
        <p>{address}</p>
        <p>{event.description}</p>
        <p>{event.time}</p>
        {/* 
          event.private ? <p>This is a private Event</p> : <p>This is Public Event</p>
         */}
        <CommentBox 
          event={this.props.event} 
          username={this.props.username} 
          eventID={this.props.event.id} 
          comments={this.props.event.comments}
          redirect={this.props.redirect}
        />
        <Map event={event} />
      </div>
    );
  }
}
export default CurrentlyClickedEvent;
