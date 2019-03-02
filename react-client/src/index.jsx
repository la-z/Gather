/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { Row, Col, Table } from 'react-materialize';

import NavbarComp from './components/navbar.jsx';
import Info from './components/Info.jsx';
import Categories from './components/categories.jsx';
import EventList from './components/eventList.jsx';
import EventPage from './components/eventPage.jsx';
import Geocoder from './components/createEventForm.jsx';
// import ChildComponentHolder from './components/appendChild.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import Edit from './components/EditEvent.jsx';
import MyEvents from './components/MyEvents.jsx';
import Spinner from './components/Preloader.jsx';
import EditEvent from './components/EditEventForm.jsx';
import FriendsList from './components/FriendsList.jsx'
import AttendingUsersList from './components/AttendingUsersList.jsx'

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
      attendingUsers: [],
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
    this.editEvent = this.editEvent.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.addFriend = this.addFriend.bind(this);
    // this.eventEditSubmited = this.eventEditSubmited.bind(this);
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
      .then(({ data, headers }) => {
        // console.log(headers);
        if (headers.login && headers.user) {
          this.setState({ events: data, loggedin: true, username: headers.user }, cb);
        } else {
          this.setState({ events: data }, cb);
        }
      });
  }

  setUserID(username, userID) {
    this.setState({
      userID, username, view: 'main', loggedin: true,
    });
    // this.setState({ username });
  }

  // create an addFriend function
  // send  a post request to endpoint /addFriend
  // open a text/input field to enter friend's username
  // link function to click event on NavItem
  async addFriend(username) {
    const params = {
      username: username, 
      myId: this.state.userID
    };
    this.togglePreloader();
    let response = await axios.post('/addFriend', params)
    return response; 
  }

  clickPostComment() {
    const { clickedEvent } = this.state;
    const { id } = clickedEvent;
    this.togglePreloader();
    axios.get(`/events/${id}`)
      .then(({ data }) => {
        this.togglePreloader();
        this.renderClickedEventTitle(data);
      })
      .catch((err) => {
        console.error(err);
        this.togglePreloader();
      });
  }

  togglePreloader() {
    const { preloader } = this.state;
    this.setState({ preloader: !preloader });
  }

  clickHome() {
    this.forceUpdate();
    this.togglePreloader();
    axios.get('/events/category/all')
      .then(({ data }) => {
        this.togglePreloader();
        this.setState({ events: data, view: 'main' });
      })
      .catch((err) => {
        console.error(err);
        this.togglePreloader();
      });
    this.setState({
      submit: true,
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

  // runs when edit event button is clicked on event page
  editEvent() {
    // redirect to createeventform page
    this.setState({
      view: 'editEvent',
    });
  }

  // runs when edit button is clicked on createeventform page
  editSubmit() {
    console.log('edit submitted');

    // only works on refresh right now
    // this.forceUpdate();
    this.setState({
      view: 'main',
    });
  }

  // eventEditSubmited(e) {
  //   console.log(`This is the event: ${e}`);
  //   console.log(e);
  // }

  renderClickedEventTitle(object) {

    this.setState({
      clickedEvent: object,
      view: 'eventPage',
    });

    //    get req to server
    //    endpoint: /events/${event.id}/rsvp
    //    send 'going'
    //    set attending users state to array from server
    //    send down to eventpage

    axios.get(`/events/${object.id}/rsvp`)
      .then((res) => {
        console.log(res);

        this.setState({
          attendingUsers: res.data,
        });
      })
      .catch((err) => { console.log(err); });
  }


  render() {
    const {
      events, clickedEvent, view, userID, loggedin, username, preloader, categories, submit, attendingUsers,
    } = this.state;
    const Navbar = () => (
      <NavbarComp
        loggedin={loggedin}
        username={username}
        clickHome={this.clickHome}
        clickCreateEvent={this.clickCreateEvent}
        clickMyEvents={this.clickMyEvents}
        clickSignout={this.clickSignout}
        handleLogin={this.handleLogin}
        handleSignup={this.handleSignup}
        addFriend={this.addFriend}
      />
    );
    if (view === 'main') {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
          <Row>
            <Col s={12} m={3}>
              <Info />
            </Col>
            <Col s={12} m={6}>
              <Categories categories={categories} getCategory={this.getCategory} />
            </Col>
          </Row>
          <EventList
            togglePreloader={this.togglePreloader}
            loggedin={loggedin}
            events={events}
            renderClickedEventTitle={this.renderClickedEventTitle}
            view={view}
            getEvents={this.getCategory}
          />
        </div>
      );
    } if (view === 'eventPage') {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
          
          <EventPage
            event={clickedEvent}
            username={username}
            refresh={this.clickHome}
            editEvent={this.editEvent}
          />
          <AttendingUsersList
            attendingUsers={attendingUsers}
          />
        </div>
      );
    } if (view === 'createEvent' && loggedin) {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
          <CreateEvent
            eventInfo={clickedEvent}
            submit={submit}
          />
          <Geocoder
            redirect={this.clickMyEvents}
            categories={categories}
            eventInfo={clickedEvent}
          />
        </div>
      );
    } if (view === 'editEvent' && loggedin) {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
          <Edit
            eventInfo={clickedEvent}
            submit={submit}
          />
          <EditEvent
            redirect={this.clickMyEvents}
            categories={categories}
            eventInfo={clickedEvent}
            editSubmit={this.editSubmit}
            eventEditSubmited={this.eventEditSubmited}
          />
        </div>
      );
    } if (view === 'myEvents' && loggedin) {
      return (
        <div>
          {preloader ? <Spinner /> : null}
          <Navbar />
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
















