class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authorVal: '', // this needs to be set with username passed down with props
      textVal: '', //this is the value from the field
    };
  }

  handleSubmit(e) {
    //e.preventDefault();
    this.setState({
      authorVal: e.target[0].value.trim(),
      textVal: e.target[1].value.trim(),
    });
    this.props.onCommentSubmit({author: authorVal, text: textVal});
    // e.target[0].value = '';
    // e.target[1].value = '';
  }

  render() {
    return(
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
