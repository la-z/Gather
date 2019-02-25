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
import Spinner from './components/Preloader.jsx';

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
      preloader: false,
      categories: [],
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
    this.togglePreloader = this.togglePreloader.bind(this);
    this.getCategoryNames = this.getCategoryNames.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.togglePreloader();
    this.getCategory('all', () => {
      this.getCategoryNames(() => this.togglePreloader());
    });
  }

  getCategoryNames(cb = () => {}) {
    axios.get('/category')
      .then(({ data }) => this.setState({ categories: data }, cb));
  }

  getCategory(categoryName, cb = () => {}) {
    axios.get(`/events/category/${categoryName}`)
      .then(({ data }) => this.setState({ events: data }, cb));
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

  togglePreloader() {
    const { preloader } = this.state;
    this.setState({ preloader: !preloader });
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
    this.togglePreloader();
    axios.get('/logout')
      .then(() => {
        this.togglePreloader();
        this.setState({ view: 'main', loggedin: false });
      })
      .catch((err) => {
        console.error(err);
        this.togglePreloader();
      });
  }

  handleLogin(username, password) {
    const params = {
      username,
      password,
    };
    this.togglePreloader();
    axios.post('/login', params)
      .then(({ data }) => {
        this.togglePreloader();
        this.setUserID(data.username, data.id);
      })
      .catch((err) => {
        console.error(err);
        this.togglePreloader();
      });
  }

  handleSignup(username, password, email, tel) {
    const params = {
      username,
      password,
      email,
      tel,
    };
    this.togglePreloader();
    axios.post('/signup', params)
      .then(({ data }) => {
        this.togglePreloader();
        this.setUserID(data.username, data.userID);
      })
      .catch((err) => {
        console.error(err);
        this.togglePreloader();
      });
  }

  renderClickedEventTitle(object) {
    this.setState({
      clickedEvent: object,
      view: 'eventPage',
    });
  }

  render() {
    const {
      events, clickedEvent, view, userID, loggedin, username, preloader, categories,
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
          {preloader ? <Spinner /> : null}
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <Categories categories={categories} />
          <EventList
            events={events}
            renderClickedEventTitle={this.renderClickedEventTitle}
          />
        </div>
      );
    } if (view === 'eventPage') {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <EventPage
            event={clickedEvent}
            username={username}
            redirect={this.renderClickedEventTitle}
          />
        </div>
      );
    } if (view === 'createEvent' && loggedin) {
      return (
        <div>
          {preloader ? <Spinner /> : null}
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
          {preloader ? <Spinner /> : null}
          <Navbar />
          <Loggedin
            username={username}
            loggedin={loggedin}
          />
          <MyEvents
            togglePreloader={this.togglePreloader}
            userID={userID}
            username={username}
            renderClickedEventTitle={this.renderClickedEventTitle}
          />
        </div>
      );
    }
    return (
      <div>
        {preloader ? <Spinner /> : null}
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
