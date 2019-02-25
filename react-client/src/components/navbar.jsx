import React from 'react';
import { Button, Icon, Navbar, NavItem, Modal } from 'react-materialize';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

const NavbarComp = ({ loggedin, clickHome, clickCreateEvent, clickMyEvents, clickLoginForm, clickSignupForm, clickSignout }) => {
  if (loggedin) {
    return (
      <Navbar brand="logo" right>
        <NavItem onClick={clickHome}>Home</NavItem>
        <NavItem onClick={clickMyEvents}>MyEvents<Icon right>cloud</Icon></NavItem>
        <NavItem onClick={clickSignout}>Logout<Icon right>cloud</Icon></NavItem>
        <Button floating large className='green' waves='light' icon='add' onClick={clickCreateEvent} />
      </Navbar>
    );
  }
  return (
    <Navbar brand="logo" right>
      <NavItem onClick={clickHome}>Home</NavItem>
      <NavItem><Modal trigger={<NavItem>Login</NavItem>}><LoginForm /></Modal></NavItem>
      {/* for some reason NavItems were not aligning correctly without this ugly hack */}
      <NavItem><Modal trigger={<NavItem>Signup</NavItem>}><SignupForm /></Modal></NavItem>
      <Button floating large className='green' waves='light' icon='add' onClick={clickCreateEvent} />
    </Navbar>
  )
};

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

