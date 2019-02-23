import React from 'react';
import { Button, Icon } from 'react-materialize'

// export default () => (
//   <Button waves='light'>
//     <Icon>thumb_up</Icon>
//   </Button>
// )

// eslint-disable-next-line react/prop-types
const Navbar = ({ setClickEventBackToNull }) => (
  <div>
    <h2>Navbar</h2>
    <button type="button" onClick={setClickEventBackToNull}>Home</button>
    <Button onClick={setClickEventBackToNull}>Login/Signup</Button>
  </div>
);

export default Navbar;
