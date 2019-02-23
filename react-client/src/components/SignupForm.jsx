import React from 'react';
import { Button } from 'react-materialize';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // onSubmit,
  // onChange,
  render() {
    return (
      <form className="form-inline">
        {/* onSubmit={this.handleFormSubmit}> */}
      username: (Minimum requirements)
        <input
          type="text"
          className="form-control input-lg"
          id="username"
          placeholder="username"
          // ref={this.setSearchInputElementReference}
          // required
        />
        password:
        <input
          type="text"
          className="form-control input-lg"
          id="password"
          placeholder="******"
          // ref={this.setSearchInputElementReference}
          // required
        />
        Confirm password:
        <input
          type="text"
          className="form-control input-lg"
          id="passwordConfirm"
          placeholder="******"
          // ref={this.setSearchInputElementReference}
          // required
        />
        Email
        <input
          type="text"
          className="form-control input-lg"
          id="password"
          placeholder="******"
          // ref={this.setSearchInputElementReference}
          // required
        />
        <Button type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default SignupForm;
