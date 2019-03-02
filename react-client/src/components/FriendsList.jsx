import React from 'react';
import { Row, Col, Table } from 'react-materialize';

function FriendsList({ friends, size, getFriendEventDashboard}) {
    return <div>
        <Table>
            <thead>
                <tr>
                    <th data-field="Friends">Friends</th>
                </tr>
            </thead>
            <tbody>
                {
                    friends.map((friend) => <tr onClick={getFriendEventDashboard}>{friend}</tr>)    
                }
            </tbody>
        </Table>
    </div>
}

export default FriendsList;