import React from 'react';

class MyComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getCommentsByUsername = this.getCommentsByUsername.bind(this);
  }

  componentDidMount() {
    this.getCommentsByUsername();
  }

  getCommentsByUsername() {
    const { username } = this.props;
    console.log(username);
  }

  render() {
    return (
      <div>
        The Comments I have posted will show up here
      </div>
    );
  }
}

export default MyComments;
