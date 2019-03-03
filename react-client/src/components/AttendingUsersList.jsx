import React from 'react';
import { Row } from 'react-materialize';
import AttendingListEntry from './attendingListEntry.jsx';


const AttendingUsersList = ({ attendingUsers }) => (
  <Row className="events-list">
    <div>Attending:</div>
    {attendingUsers.map(user => (
      <AttendingListEntry
        user={user}
      />
    ))}
  </Row>
);
export default AttendingUsersList;
