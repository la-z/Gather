import React from 'react';
import { Card, Col, Button, Toast } from 'react-materialize';
import axios from 'axios';
import moment from 'moment';

class AttendingListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentDidMount() {
  //  // get req for usernames?
  //   });

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.UserId}
      </div>
    );
  }
}

export default AttendingListEntry;
