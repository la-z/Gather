import React from 'react';
import { Row } from 'react-materialize';
import AttendingListEntry from './attendingListEntry.jsx';


const AttendingUsersList = ({ attendingUsers }) => (
  <Row className="events-list">
    {attendingUsers.map(user => (
      <AttendingListEntry
        user={user}
      />
    ))}
  </Row>
);
export default AttendingUsersList;

// import { Row, Col, Table } from 'react-materialize';

// function AttendingUsersList({attendingUsers}) {
//   // if (attendingUsers.length >= 1) {
//     return (
//       <div>
//         <Table>
//           <thead>
//             <tr>
//               <th data-field="Friends">Attending</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendingUsers.data.map(user => <tr>{user.UserId}</tr>)}
//           </tbody>
//         </Table>
//       </div>
//     );
//   // }
//   // return (
//   //   <div>Nobody is Attending</div>
//   // );
// }

// export default AttendingUsersList;
