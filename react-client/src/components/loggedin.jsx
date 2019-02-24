import React from 'react';

const Loggedin = props => (
  (!props.loggedin) ? <span className="loggedin"> Welcome Anon</span>
    : <span className="loggedin"> Welcome {props.username}</span>
);
export default Loggedin;
