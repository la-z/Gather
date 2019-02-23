/* eslint react/prop-types: 0 */
import React from 'react';
import Map from './map.jsx';

class CurrentlyClickedEvent extends React.Component {
  constructor(props) {
    super(props);
    const { event } = this.props;
    this.state = {
      event,
    };
  }

  render() {
    const { event } = this.state;
    return (
      <div>
        <h1>
          {event.title}
        </h1>
        <h3>
          {event.time}
        </h3>
        <p>
          {event.description}
        </p>
        <Map event={event} />
      </div>
    );
  }
}
export default CurrentlyClickedEvent;
