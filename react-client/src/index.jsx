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
import Geocoder from './components/createEventForm.jsx';
import ChildComponentHolder from './components/appendChild.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import MyEvents from './components/MyEvents.jsx';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import Loggedin from './components/loggedin.jsx';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: data,
      clickedEvent: null,
      view: 'main',
      username: null,
      loggedin: false,
      userID: null,
    };
    this.renderClickedEventTitle = this.renderClickedEventTitle.bind(this);
    this.clickHome = this.clickHome.bind(this);
    this.clickCreateEvent = this.clickCreateEvent.bind(this);
    this.clickMyEvents = this.clickMyEvents.bind(this);
    this.clickLoginForm = this.clickLoginForm.bind(this);
    this.clickSignupForm = this.clickSignupForm.bind(this);
    this.setLoggedin = this.setLoggedin.bind(this);
    this.setUserID = this.setUserID.bind(this);
  }

  componentDidMount() {
  // axios.get('/events/public)
    // .then((events) => {
    //   console.log(events);
    //   setState({ events })
    // })
  }

  setLoggedin() {
    this.setState({ loggedin: true });
  }

  setUserID(username, userID) {
    this.setState({ userID });
    this.setState({ username });
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

  clickLoginForm() {
    this.setState({
      view: 'loginForm',
    });
  }

  clickSignupForm() {
    this.setState({
      view: 'signupForm',
    });
  }

  renderClickedEventTitle(object) {
    this.setState({
      clickedEvent: object,
      view: 'eventPage',
    });
  }


  render() {
    const { events, clickedEvent, view, userID, loggedin, username } = this.state;
    if (view === 'main') {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <Categories />
          <EventList events={events} renderClickedEventTitle={this.renderClickedEventTitle} />
        </div>
      );
    } if (view === 'eventPage') {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <EventPage event={clickedEvent} />
        </div>
      );
    } 
    // if (view === 'main' && loggedin) {
    //   return (
    //     <div>
    //       <span className="loggedin"> Welcome  {username}</span>
    //       <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
    //       <Categories />
    //       <EventList events={events} renderClickedEventTitle={this.renderClickedEventTitle} />
    //     </div>
    //   );
    // } 
    if (view === 'createEvent' && loggedin) {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <CreateEvent redirect={this.clickMyEvents} />
          <Geocoder />
        </div>
      );
    } if (view === 'myEvents' && loggedin) {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <MyEvents userID={userID} username={username} />
        </div>
      );
    } if (view === 'loginForm') {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <LoginForm redirect={this.clickMyEvents} setLoggedin={this.setLoggedin} setUserID={this.setUserID} />
        </div>
      );
    } if (view === 'signupForm') {
      return (
        <div>
          <Loggedin username={username} loggedin={loggedin} />
          <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
          <SignupForm />
        </div>
      );
    }
    return (
      <div>
        <Loggedin username={username} loggedin={loggedin} />
        <NavbarComp clickHome={this.clickHome} clickCreateEvent={this.clickCreateEvent} clickMyEvents={this.clickMyEvents} clickLoginForm={this.clickLoginForm} clickSignupForm={this.clickSignupForm} />
        Sorry :3 Status 404
        <br />
        Please try Logging-in/Signing-up or going to our home
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
