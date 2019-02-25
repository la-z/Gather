import React from 'react';
import { Button } from 'react-materialize';

class LoginForm extends React.Component {
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
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
        <Button type="button" onClick={() => handleLogin(username, password)}>Login!!</Button>
      </form>
    );
  }
}

export default LoginForm;
