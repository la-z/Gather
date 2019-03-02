/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Button } from 'react-materialize';
import Map from './map.jsx';
import CommentBox from './CommentBox.jsx';

class CurrentlyClickedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      date: null,
      time: null,
    };
    this.reverseGeocodingRequest = this.reverseGeocodingRequest.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editClick = this.editClick.bind(this);
  }

  componentDidMount() {
    const { event } = this.props;
    this.reverseGeocodingRequest();
    console.log(moment(event.time).toLocaleString().slice(15));
    this.setState({
      date: moment(event.time).toLocaleString().slice(0, -18),
      time: moment(event.time).toLocaleString().slice(15, -12),
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

  // add 'delete event' button
  //  onclick call func
  //    func calls delete req to server
  //    endpoint: /event/${event.eventId}
  //    req.params.eventId // event.eventId?
  //    reload page?
  deleteEvent() {
    const { event, editSubmit } = this.props;
    console.log('delete event');
    axios.delete(`/events/${event.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => { console.log(err); });
    editSubmit();
  }

  // add 'edit event' button
  //  onclick call func (this.props.onClick) from index props
  //    redirect to new event page
  //    func calls get req to server
  //    endpoint: /events/:eventId
  editClick() {
    console.log('edit event');
    const { editEvent } = this.props;
    editEvent();
    // redirect to createEventForm page
    //    change state of view in index.jsx
  }


  render() {
    const {
      event,
      username,
      refresh,
    } = this.props;
    const {
      title,
      category,
      description,
      eventID,
      comments,
    } = event;
    const {
      address,
      date,
      time,
    } = this.state;

    return (
      <Row className="event-page">
        <div>
          <h3>{title}</h3>
          <h4>{category}</h4>
          <p>{address}</p>
          <p>{description}</p>
          <p>
            When: {date}
            <br />
            {time}
          </p>
          {/*
            event.private ? <p>This is a private Event</p> : <p>This is Public Event</p>
          */}
          <Col s={12} m={6}>
            <CommentBox
              event={event}
              username={username}
              eventID={eventID}
              comments={comments}
              refresh={refresh}
            />
            <Button type="btn" className="btn btn-primary" onClick={this.deleteEvent}>Delete Event</Button>
            <Button type="btn" className="btn btn-primary" onClick={this.editClick}>Edit Event</Button>
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
