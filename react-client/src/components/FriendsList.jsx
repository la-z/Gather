import React from 'react';
import { Row, Col, Table } from 'react-materialize';

function FriendsList({friends, size}) {
    return <div>
        <Table>
            <thead>
                <tr>
                    <th data-field="Friends">Friends</th>
                </tr>
            </thead>
            <tbody>
                {
                friends.map((friend) => <tr>{friend}</tr>)    
                }
            </tbody>
        </Table>
    </div>
}

export default FriendsList;