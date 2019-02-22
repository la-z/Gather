/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
// uncomment when working with server
// import axios from 'axios';
import data from './mockEvents.js';
import Navbar from './components/navbar.jsx';
import Categories from './components/categories.jsx';
import EventList from './components/eventList.jsx';
import CurrentlyClickedEvent from './components/CurrentlyClickedEvent.jsx';
// import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data,
      clickedEvent: null,
    };
    this.renderClickedEventTitle = this.renderClickedEventTitle.bind(this);
    this.setClickEventBackToNull = this.setClickEventBackToNull.bind(this);
  }

  setClickEventBackToNull() {
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
        <Navbar setClickEventBackToNull={this.setClickEventBackToNull} />
        {
          clickedEvent !== null ? (
            <div>
              <CurrentlyClickedEvent event={clickedEvent} />
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
