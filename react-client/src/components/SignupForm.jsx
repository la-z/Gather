/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-materialize';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      tel: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTelChange = this.handleTelChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleTelChange(e) {
    this.setState({ tel: e.target.value });
  }

  render() {
    const {
      username,
      password,
      email,
      tel,
    } = this.state;
    const { handleSignup } = this.props;
    return (
      <form>
        <input type="text" name="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
        <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleEmailChange} />
        <input type="tel" name="tel" placeholder="504555555" value={tel} onChange={this.handleTelChange} />
        <Button className="orange darken-3" type="button" onClick={() => handleSignup(username, password, email, tel)}>Sign Up!</Button>
      </form>
    );
  }
}

export default SignupForm;
