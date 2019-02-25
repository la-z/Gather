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
    // const { comments } = this.props;
    this.state = {
      comments: this.props.event.Comments,
    };
  }

  componentDidMount() {
    // need axios request to comments endpoint and render set said data to the page/state
    // this.setState{
    //   data: commentData
    // }
  }

  handleCommentSubmit(comment) {
    this.state.data.push(comment);
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  }

  render() {
    console.log(this.props.event.Comments);
    const { comments } = this.state;
    const { username, eventID } = this.props;
    return (
      <div className="comment-box">
        <CommentForm  username={username} redirect={this.props.redirect} eventID={eventID} />
        <CommentList data={comments} />
      </div>
    );
  }
}

export default CommentBox;

