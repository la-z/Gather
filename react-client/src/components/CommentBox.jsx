import React from 'react';
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';

// const commentData = [
//   { 
//     author:"Shawn Spencer", 
//     text:"I've heard it both ways"
//   },
//   { 
//     author:"Burton Guster", 
//     text:"You hear about Pluto? That's messed up" 
//   }
// ];

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    const { event, username, eventID } = this.props;
    this.state = {
      comments: event.Comments,
      username,
      eventID,
      data: [],
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
    //this.state.data.push(comment);
    let comments = this.state.comments;
    let newComments = comments.concat([comment]);
    this.setState({comments: newComments});
  }

  render() {
    const { comments, username, eventID } = this.state;
    return (
      <div className="comment-box">
        <CommentForm  username={username} redirect={this.props.redirect} eventID={eventID} />
        <CommentList data={comments} />
      </div>
    );
  }
}

export default CommentBox;

