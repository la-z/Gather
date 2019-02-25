/* eslint-disable import/extensions, react/prop-types */
import React from 'react';
import axios from 'axios';
import EventList from './eventList.jsx';
import MyComments from './MyComments.jsx';


class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myEvents: '',
    };
  }

  componentDidMount() {
  // need to pull events thats match the userID that is already passed into this component on props.
    const { togglePreloader } = this.props;
    togglePreloader();
    axios.get('/events/my-events')
      .then(({ data }) => {
        console.log(data);
        togglePreloader();
        this.setState({ myEvents: data });
      });
  }

  render() {
    const { myEvents } = this.state;
    const { renderClickedEventTitle, username } = this.props;
    if (!myEvents.length) {
      return (
        <div>
          <span id="my-events-title-empty">MyEvents</span>
          <p>
            Awww its looks like you havent made any events.
            <br />
            Click the (+) button to make a new event!
          </p>
          
        </div>
      );
    }
    return (
      <div>
        <span id="my-events-title">My Events</span>
        <EventList events={myEvents} renderClickedEventTitle={renderClickedEventTitle} />
        <br />
        
      </div>
    );
  }
}

export default MyEvents;
