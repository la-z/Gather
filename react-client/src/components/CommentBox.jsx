import React from 'react';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    const { event, username, eventID } = this.props;
    this.state = {
      comments: event.Comments,
      username,
      eventID,
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    // need axios request to comments endpoint and render set said data to the page/state
    // this.setState{
    //   data: commentData
    // }
  }

  handleCommentSubmit(comment) {
    const { comments } = this.state;
    const newComments = comments.concat([comment]);
    this.setState({ comments: newComments });
  }

  render() {
    const { comments, username, eventID } = this.state;
    const { redirect } = this.props;
    return (
      <div className="comment-box">
        <CommentForm username={username} redirect={redirect} eventID={eventID} />
        <CommentList comments={comments} />
      </div>
    );
  }
}

export default CommentBox;
