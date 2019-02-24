import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorVal: this.props.username, 
      textVal: '', //this is the value from the field
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    //e.preventDefault();
    this.setState({
      authorVal: this.props.username,
      textVal: e.target[1].value.trim(),
    });
    this.props.onCommentSubmit({author: authorVal, text: textVal});
    // e.target[0].value = '';
    // e.target[1].value = '';
  }

  render() {
    return (
      <form className="comment-form form-group" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-addon">Name</span>
          <input type="text" placeholder="Your name" className="form-control" />
        </div>
        <div className="input-group">
          <span className="input-group-addon">Comment</span>
          <input type="text" placeholder="Say something..." className="form-control" />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    );
  }
}

export default CommentForm;
