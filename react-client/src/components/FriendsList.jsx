import React from 'react';
import { Row, Col, Table } from 'react-materialize';

function FriendsList(props) {
    return <div>
        <Table>
            <thead>
                <tr>
                    <th data-field="Friends">Friends</th>
                </tr>
            </thead>
            <tbody>
                <tr>Alvin</tr>
                <tr>Simon</tr>
                <tr>Theodore</tr>
                <tr>Dave!</tr>
            </tbody>
        </Table>
    </div>
}

export default FriendsList;