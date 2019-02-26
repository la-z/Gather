import React from 'react';
import { Button } from 'react-materialize';
import axios from 'axios';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '', // this is the value from the field
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit(e) {
    const { username, eventID, refresh } = this.props;
    const { comment } = this.state;
    e.preventDefault();
    // put in an ajax request to the server to store the data in the database
    if (!username) {
      window.Materialize.toast('Please Login to Comment!', 1000);
    } else {
      const params = {
        body: comment,
      };
      axios.put(`/events/${eventID}/comments`, params)
        .then((response) => {
          refresh();
          console.log(response);
        });
    }
  }

  render() {
    const { handleSubmit, handleCommentChange } = this.props;
    const { comment } = this.state;
    return (
      <form className="comment-form" onSubmit={handleSubmit}>
        <span>Comment</span>
        <input type="text" placeholder="Say something..." value={comment} className="form-control" onChange={handleCommentChange} />
        <Button type="submit" className="btn btn-primary"> Post Comment! </Button>
      </form>
    );
  }
}

export default CommentForm;
