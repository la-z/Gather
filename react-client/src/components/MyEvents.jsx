import React from 'react';
import axios from 'axios';
import EventList from './eventList.jsx';

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myEvents: '',
    };
  }

  componentDidMount() {
  // need to pull events thats match the userID that is already passed into this component on props.
    axios.get('/events/my-events')
      .then(({ data }) => {
        console.log(data);
        this.setState({ myEvents: data });
      });
  }

  render() {
    if (!this.state.myEvents.length) {
      return (
        <div>
          <span id="my-events-title-empty">MyEvents</span>
          <p>
            Awww its looks like you havent made any events. <br />
            Click the (+) button to make a new event!
          </p>
          {/* Something from this.state.events */}
        </div>
      );
    }
    return (
      <div>
        <span id="my-events-title">My Events</span>
        <EventList events={this.state.myEvents} renderClickedEventTitle={this.props.renderClickedEventTitle} />
      </div>
    );
  }
}

export default MyEvents;
