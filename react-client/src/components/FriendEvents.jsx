/* eslint-disable import/extensions, react/prop-types */
import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-materialize';
import EventList from './eventList.jsx';
import FriendsList from './FriendsList.jsx'

class FriendEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myEvents: [],
            myRsvps: [],
            myFriends: [],
            view: this.props.view,
        };
        // this.getFriendEvents = this.getFriendEvents.bind(this);
    }

    async componentDidMount() {
        // need to pull events thats match the userID that is already passed into this component on props.
        const { togglePreloader, userId, username } = this.props;
        togglePreloader();
        let friendEvents = await axios.get(`/events/friend/${userId}`)
        // console.log(friendEvents)
        this.setState({ myEvents: friendEvents.data})

        let friendRSVP = await axios.get(`/user/rsvp/${username}`)
        console.log(friendRSVP);
        this.setState({myRsvps: friendRSVP.data})

        let response = await axios.get(`/myFriends/${userId}`);
        // console.log(response)
        let friendList = response.data.map(friend => friend.username)
        this.setState({ myFriends: friendList })
    }


    render() {
        const { myEvents, myRsvps, redirect } = this.state;
        const { renderClickedEventTitle, getEvents, getFriendEventDashboard } = this.props;

        if (!myEvents.length && !myRsvps.length) {
            return (
                <div>
                    <span id="my-events-title-empty">MyEvents</span>
                    <p>
                        Awww it looks like you havent made any events.
            <br />
                        Click the New Event button to make a new event!
          </p>
                </div>
            );
        }
        return (
            <Row>
                <Col s={12} m={6}>
                    <h5>My RSVPs</h5>
                    <EventList events={myRsvps} size="12" renderClickedEventTitle={renderClickedEventTitle} getEvents={getEvents} />
                </Col>
                <Col s={12} m={6}>
                    <h5>My created events</h5>
                    <EventList events={myEvents} size="12" renderClickedEventTitle={renderClickedEventTitle} getEvents={getEvents} />
                </Col>
                <Col s={12} m={6}>
                    <h5>My Friends List</h5>
                    <FriendsList size="12" friends={this.state.myFriends} getFriendEventDashboard={getFriendEventDashboard} />
                </Col>
                <br />
            </Row>
        );
    }
}

export default FriendEvents;
