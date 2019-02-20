/* eslint react/prop-types: 0 */
import React from 'react';

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
      </div>
    );
  }
}
export default CurrentlyClickedEvent;
