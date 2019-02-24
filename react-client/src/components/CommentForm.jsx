import React from 'react';
import { Button } from 'react-materialize';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorVal: this.props.username,
      eventID: this.props.eventID, 
      comment: '', //this is the value from the field
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }
  handleCommentChange(e) {
    this.setState({
      comment: e.target.value.trim(),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.onCommentSubmit({author: authorVal, text: textVal});
    // e.target[0].value = '';
    // e.target[1].value = '';
    //put in an ajax request to the server to store the data in the database
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>        
        <span>Comment</span>
        <input type="text" placeholder="Say something..."  value={this.state.comment} className="form-control" onChange={ this.handleCommentChange }/>
        <Button type="submit" className="btn btn-primary"> Post Comment! </Button>
      </form>
    );
  }
}

export default CommentForm;
