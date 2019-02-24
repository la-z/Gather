import React from 'react';

const commentData = [
  { 
    author:"Shawn Spencer", 
    text:"I've heard it both ways"
  },
  { 
    author:"Burton Guster", 
    text:"You hear about Pluto? That's messed up" 
  }
];

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: commentData,
      data: [],
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
    return (
      <div className="comment-box">
        <CommentForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.props.data} />
      </div>
    );
  }
}

export default CommentBox;

