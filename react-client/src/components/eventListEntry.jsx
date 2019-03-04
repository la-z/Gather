/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Card, Col, Button, Toast } from 'react-materialize';
import axios from 'axios';
import moment from 'moment';

class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      rsvpState: 'n/a',
      address: '',
      categories: [],
      view: props.view,
    };
    // this.reverseGeocodingRequest = this.reverseGeocodingRequest.bind(this);
  }
  
  componentDidMount() {

    const { event, getEvents } = this.props;
    getEvents('all', () => {
      console.log('events updated');
    });

    const componentDidUpdate = () => {
      // const { getEvents } = this.props;
      getEvents('all', () => {
        console.log('component did update');
      });
    };

    componentDidUpdate();

    // this.reverseGeocodingRequest();

    // console.log(moment(event.time).toLocaleString().slice(15));
    this.setState({
      date: moment(event.time).toLocaleString().slice(0, -18),
      time: moment(event.time).toLocaleString().slice(15, -12),
    });
  }

  getCategoriesByGivenEventId(eventId, cb = () => {}) {
    axios.get(`/category/${eventId}`)
      .then(({ data }) => {
        const categoryNames = Object.keys(data).map(({ name }) => name);
        this.setState({ categories: categoryNames }, cb);
      })
      .catch(err => console.log(err));
  }

  updateRSVP(params, eventID) {
    const { togglePreloader } = this.props;
    togglePreloader();
    axios.patch(`/events/${eventID}/rsvp`, params)
      .then((res) => {
        togglePreloader();
        // console.log(res);
        console.log(res);
        window.Materialize.toast(`${params.rsvp}`, 1000);
        this.setState({ rsvpState: params.rsvp });
      })
      .catch((err) => {
        togglePreloader();
        console.log(err);
      });
  }

  clickHandler(e) {
    const { togglePreloader } = this.props;
    const { event } = this.props;
    const params = { rsvp: e.target.innerHTML };
    togglePreloader();
    axios.put(`/events/${event.id}/rsvp`, params)
      .then((res) => {
        togglePreloader();
        window.Materialize.toast(`${e.target.innerHTML}`, 1000);
        console.log(res);
      })
      .catch((err) => {
        togglePreloader();
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
    const { date, time, view, categories } = this.state;
    const size = this.props.size || 6;
    return (
      <Col s={12} m={size}>
        <Card className="card">
          <h4 className="clickable" onClick={() => renderClickedEventTitle(event)}>{event.title}</h4>
          {/* <h4>{event.CategoryId}</h4> */}
          {/* <p> {this.state.address}</p> */}
          <p>{event.description}</p>
          <p>{date}</p>
          <p>{time}</p>
          {event.InterestedEvent ? <p className="rsvp">{event.InterestedEvent.rsvp}</p> : null}
          <h5>{categories}</h5>
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
