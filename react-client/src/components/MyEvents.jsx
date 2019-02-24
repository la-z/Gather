import React from 'react';
import axios from 'axios';
class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myEvents: '',
    };
  }

  componentDidMount() {
  // need to pull events thats match the userID that is already passed into this component on props.
  //   axios.get('/events/my-events')
  //     .then((data) => { 
  //       console.log(data);
  //       this.setState({ myEvents: 'state changed by axios then' }); });
  }

  render() {
    return (
      <div>
        <h1>MyEvents</h1>
        {/* Something from this.state.events */}
      </div>
    );
  }
}

export default MyEvents;
