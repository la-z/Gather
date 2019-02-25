/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

import NavbarComp from './components/navbar.jsx';
import Categories from './components/categories.jsx';
import EventList from './components/eventList.jsx';
import EventPage from './components/eventPage.jsx';
import Geocoder from './components/createEventForm.jsx';
// import ChildComponentHolder from './components/appendChild.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import MyEvents from './components/MyEvents.jsx';
import Loggedin from './components/loggedin.jsx';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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
    this.setUserID = this.setUserID.bind(this);
    this.clickSignout = this.clickSignout.bind(this);
    this.clickPostComment = this.clickPostComment.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    axios.get('/events/category/all')
      .then(({ data, headers }) => {
        if (headers.login === 'true' && headers.user) {
          return this.setState({ events: data }, () => this.setUserID(headers.user));
        }
        return this.setState({ events: data });
      })
      .catch(err => console.log(err));
  }

  setUserID(username, userID) {
    this.setState({
      userID, username, view: 'main', loggedin: true,
    });
    // this.setState({ username });
  }

  clickPostComment() {
    this.setState({ view: 'eventPage' });
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

  clickSignout() {
    axios.get('/logout')
      .then((response) => {
        console.log(response);
        this.setState({ view: 'main', loggedin: false });
      });
  }

  handleLogin(username, password) {
    const params = {
      username,
      password,
    };
    axios.post('/login', params)
      .then(({ data }) => {
        this.setUserID(data.username, data.id);
      })
      .catch(err => console.log(err));
  }

  handleSignup(username, password, email, tel) {
    const params = {
      username,
      password,
      email,
      tel,
    };
    axios.post('/signup', params)
      .then(({ data }) => {
        this.setUserID(data.username, data.userID);
      })
      .catch(err => console.log(err));
  }

  renderClickedEventTitle(object) {
    this.setState({
      clickedEvent: object,
      view: 'eventPage',
    });
  }

  render() {
    const {
      events, clickedEvent, view, userID, loggedin, username,
    } = this.state;
    const Navbar = () => (
      <NavbarComp
        loggedin={loggedin}
        clickHome={this.clickHome}
        clickCreateEvent={this.clickCreateEvent}
        clickMyEvents={this.clickMyEvents}
        clickSignout={this.clickSignout}
        handleLogin={this.handleLogin}
      />
    );
    if (view === 'main') {
      return (
        <div>
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <Categories />
          <EventList
            events={events}
            renderClickedEventTitle={this.renderClickedEventTitle}
          />
        </div>
      );
    } if (view === 'eventPage') {
      return (
        <div>
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <EventPage
            event={clickedEvent}
            username={username}
            redirect={this.clickPostComment}
          />
        </div>
      );
    } if (view === 'createEvent' && loggedin) {
      return (
        <div>
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <CreateEvent />
          <Geocoder redirect={this.clickMyEvents} />
        </div>
      );
    } if (view === 'myEvents' && loggedin) {
      return (
        <div>
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <MyEvents
            userID={userID}
            username={username}
            renderClickedEventTitle={this.renderClickedEventTitle}
          />
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <Loggedin
          username={username}
          loggedin={loggedin}
        />
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
