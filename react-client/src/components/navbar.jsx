import React from 'react';
import { Button, Icon, NavItem, Navbar, Dropdown } from 'react-materialize';

// export default () => (
//   <Button waves='light'>
//     <Icon>thumb_up</Icon>
//   </Button>
// )

// eslint-disable-next-line react/prop-types
const NavbarComp = ({ clickHome, clickCreateEvent }) => (
  <div>
    <h2>Navbar</h2>
    <div>
      <Button waves='light' onClick={clickHome}>Home</Button>
      <Button waves='light'>MyEvents<Icon left>cloud</Icon></Button>
      <Button waves='light' >Login/Signup<Icon right>cloud</Icon></Button>
      <Button floating large className='green' waves='light' icon='add' onClick={clickCreateEvent} />
    </div>
    {/* <Dropdown trigger={
      <Button>Drop me!</Button>
    }
    >
      <NavItem>one</NavItem>
      <NavItem>two</NavItem>
      {/* <NavItem divider />
      <NavItem>three</NavItem> */}

    {/* <Navbar right>
      <NavItem href="index.html">Home</NavItem>
      <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
    </Navbar> */}
    {/* <button type="button" onClick={clickHome}>Home</button>
    <Button onClick={clickHome}>Login/Signup</Button> */}
  </div>
);

export default NavbarComp;
