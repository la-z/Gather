/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-materialize';

class FriendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const { username, password } = this.state;
        const { handleLogin } = this.props;
        return (
            <form>
                <input type="text" name="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
                <Button className="orange darken-3" type="button" onClick={() => handleLogin(username, password)}>Add Friend!!</Button>
            </form>
        );
    }
}

export default FriendForm;
