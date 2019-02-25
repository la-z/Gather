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
    console.log(this.props.event.comments);
    return (
      <div>
        <h3>{event.title}</h3>
        <h4>{event.category}</h4>
        <p>{event.description}</p>
        <p>{event.time}</p>
        {
          event.private ? <p>This is a private Event</p> : <p>This is NOT a private Event</p>
        }
        <CommentBox event={this.props.event} username={this.props.username} eventID={this.props.event.id} comments={this.props.event.comments} />
        <Map event={event} />
      </div>
    );
  }
}
export default CurrentlyClickedEvent;
