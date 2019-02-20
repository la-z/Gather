import React from 'react';

// eslint-disable-next-line react/prop-types
const Navbar = ({ setClickEventBackToNull }) => (
  <div>
    <h2>Navbar</h2>
    <button type="button" onClick={setClickEventBackToNull}>Home</button>
  </div>
);

export default Navbar;
