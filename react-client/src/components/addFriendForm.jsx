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
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.friendToast = this.friendToast.bind(this);
        this.bothFunc = this.bothFunc.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    } 

    friendToast(){
        return window.Materialize.toast('friend added!', 2000);
    }

    bothFunc(){ 
        const { username, password } = this.state;
        const { handleLogin } = this.props;
        handleLogin(username, password);
        this.friendToast()
    }
    

    render() {
        const { username, password } = this.state;
        const bothFunc = this.bothFunc;
        return (
            <form>
                <input type="text" name="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
                <Button className="orange darken-3" type="button" onClick={() => {bothFunc(); }   }>Add Friend!!</Button>
            </form>
        );
    }
}

export default FriendForm;
