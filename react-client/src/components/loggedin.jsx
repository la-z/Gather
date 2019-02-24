import React from 'react';

const Loggedin = props => (
  (!props.loggedin) ? <span className="loggedin"> Howdy stranger! Login or Signup to take full advantge of Gather </span>
    : <span className="loggedin"> Welcome {props.username}</span>
);
export default Loggedin;
