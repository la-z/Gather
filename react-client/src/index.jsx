/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
// uncomment when working with server
// import axios from 'axios';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

import data from './mockEvents.js';
import NavbarComp from './components/navbar.jsx';
import Categories from './components/categories.jsx';
import EventList from './components/eventList.jsx';
import EventPage from './components/eventPage.jsx';
import Geocoder from './components/geocoderInputBar.jsx';
import ChildComponentHolder from './components/appendChild.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import MyEvents from './components/MyEvents.jsx';
// import PropTypes from 'prop-types';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data,
      clickedEvent: null,
      view: 'main',
      user: null,
      loggedin: false,
    };
    this.renderClickedEventTitle = this.renderClickedEventTitle.bind(this);
    this.clickHome = this.clickHome.bind(this);
    this.clickCreateEvent = this.clickCreateEvent.bind(this);
    this.clickMyEvents = this.clickMyEvents.bind(this);
  }

  clickHome() {
    this.setState({
      view: 'main',
    });
  }

  clickCreateEvent() {
    this.setState({
      view: 'createEvent',
    });
  }

  clickMyEvents() {
    this.setState({ 
      view: 'myEvents',
    });
  }

  renderClickedEventTitle(object) {
    this.setState({
      clickedEvent: object,
      view: 'eventPage',
    });
  }


  render() {
    const { events, clickedEvent, view, user, loggedin } = this.state;
    if (view === 'main') {
      return (
        <div>
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} />
          <Categories />
          <EventList events={events} renderClickedEventTitle={this.renderClickedEventTitle} />
        </div>
      );
    } if (view === 'eventPage') {
      return (
        <div>
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} />
          <EventPage event={clickedEvent} />
        </div>
      );
    } if (view === 'createEvent') {
      return (
        <div>
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} />
          <CreateEvent />
        </div>
      );
    } if (view === 'myEvents') {/*&& loggedin*/} {
      return (
        <div>
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} />
          <MyEvents user={user} />
        </div>
      );
    }
    return (
      <div>
        Whaaaa?? Status 404
      </div>

    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
