import React from 'react';
import { Button, Icon, NavItem, Dropdown } from 'react-materialize';

const NavbarComp = ({ clickHome, clickCreateEvent, clickMyEvents, clickLoginForm, clickSignupForm }) => (
  <div>
    <h2>Navbar</h2>
    <div>
      <Button waves='light' onClick={clickHome}>Home</Button>
      <Button waves='light' onClick={clickMyEvents}>MyEvents<Icon left>cloud</Icon></Button>
      <Button waves='light' onClick={clickLoginForm}>Login<Icon right>cloud</Icon></Button>
      <Button waves='light' onClick={clickSignupForm}>Signup<Icon right>cloud</Icon></Button>
      <Button floating large className='green' waves='light' icon='add' onClick={clickCreateEvent} />
    </div>

  </div>
);

export default NavbarComp;

// export default () => (
//   <Button waves='light'>
//     <Icon>thumb_up</Icon>
//   </Button>
// )
/*      
<Modal
header='Modal Header'
trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.
</p>
</Modal>
*/
    /* <Dropdown trigger={
      <Button>Drop me!</Button>
    }
    >
      <NavItem>one</NavItem>
      <NavItem>two</NavItem>
      {/* <NavItem divider />
      <NavItem>three</NavItem> */

    /* <Navbar right>
      <NavItem href="index.html">Home</NavItem>
      <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
    </Navbar> */
    /* <button type="button" onClick={clickHome}>Home</button>
    <Button onClick={clickHome}>Login/Signup</Button> */
// eslint-disable-next-line react/prop-types

