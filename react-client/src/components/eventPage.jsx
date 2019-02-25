/* eslint react/prop-types: 0 */
import React from 'react';
import Map from './map.jsx';
import CommentBox from './CommentBox.jsx';

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
        <h3>{event.title}</h3>
        <h4>{event.category}</h4>
        <p>{event.description}</p>
        <p>{event.time}</p>
        {
          event.private ? <p>This is a private Event</p> : <p>This is Public Event</p>
        }
        <CommentBox 
          event={this.props.event} 
          username={this.props.username} 
          eventID={this.props.event.id} 
          comments={this.props.event.comments}
          redirect={this.props.redirect}
        />
        <Map event={event} />
      </div>
    );
  }
}
export default CurrentlyClickedEvent;
