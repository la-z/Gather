import React from 'react';
import { Button } from 'react-materialize';
import axios from 'axios';

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
    this.handleSignup = this.handleSignup.bind(this);
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

  handleSignup() {
    console.log('handle signup');
    const { username, password, email, tel } = this.state;
    const params = {
      username,
      password,
      email,
      tel,
    };
    axios.post('/signup', params)
      .then(({ data }) => { this.props.redirect(data.username, data.userID); console.log(result); })
      .catch((err) => { console.log(err); });
  }


  render() {
    const { username, password, email, tel } = this.state;
    return (
      <form>
        <input type="text" name="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
        <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleEmailChange} />
        <input type="tel" name="tel" placeholder="504555555" value={tel} onChange={this.handleTelChange} />
        <Button type="button" onClick={this.handleSignup}>Sign Up!!</Button>
      </form>
    );
  }
}

export default SignupForm;
