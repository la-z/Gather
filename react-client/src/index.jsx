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
// import PropTypes from 'prop-types';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data,
      clickedEvent: null,
    };
    this.renderClickedEventTitle = this.renderClickedEventTitle.bind(this);
    this.clickHome = this.clickHome.bind(this);
  }

  clickHome() {
    this.setState({
      clickedEvent: null,
    });
  }

  renderClickedEventTitle(object) {
    this.setState({
      clickedEvent: object,
    });
  }


  render() {
    const { events, clickedEvent } = this.state;
    return (
      <div>
        <h1>Gather</h1>
        <NavbarComp clickHome={this.clickHome} />
        <ChildComponentHolder>
          <Geocoder />
          {/* 
          {
            InsertChildComponentHere 
          } 
          */}
        </ChildComponentHolder>
        {
          clickedEvent !== null ? (
            <div>
              <EventPage event={clickedEvent} />
            </div>
          )
            : (
              <div>
                <Categories />
                <EventList events={events} renderClickedEventTitle={this.renderClickedEventTitle} />
              </div>
            )
        }
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
