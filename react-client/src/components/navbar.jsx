/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Icon,
  Navbar,
  NavItem,
  Modal,
} from 'react-materialize';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import FriendForm from './addFriendForm.jsx';

const NavbarComp = ({
  loggedin,
  clickHome,
  clickCreateEvent,
  clickMyEvents,
  clickSignout,
  handleLogin,
  handleSignup,
  username,
  addFriend
}) => {
  if (loggedin) {
    return (
      <Navbar className="navbar" brand={<img src="./Gather-logo-extended.png" alt="" />} right>
        <NavItem onClick={() => {}}>Welcome back, {username}!</NavItem>
        <NavItem onClick={clickHome}>
          Home
          <Icon right>home</Icon>
        </NavItem>
        <NavItem onClick={clickMyEvents}>
          Events Dashboard
          <Icon right>ballot</Icon>
        </NavItem>
        <NavItem onClick={clickCreateEvent}>
          New Event
          <Icon right>publish</Icon>
        </NavItem>
        <NavItem onClick={clickSignout}>
          Logout
          <Icon right>eject</Icon>
        </NavItem>
      </Navbar>
    );
  }
  return (
    <Navbar className="navbar" brand={<img src="./Gather-logo-extended.png" alt="" />} right>
      <NavItem onClick={() => {}}>You are not currently logged in.</NavItem>
      <NavItem onClick={clickHome}>Home</NavItem>
      <NavItem>
        <Modal
          trigger={<NavItem>Login</NavItem>}
          header="Login"
        >
          <LoginForm handleLogin={handleLogin} />
        </Modal>
      </NavItem>
      <NavItem>
        <Modal
          trigger={<NavItem>Add Friend</NavItem>}
          header="Add a Friend"
        >
          <FriendForm handleLogin={addFriend} />
        </Modal>
      </NavItem>
      {/* for some reason NavItems were not aligning correctly without this ugly hack */}
      <NavItem>
        <Modal
          trigger={<NavItem>Signup</NavItem>}
          header="Signup"
        >
          <SignupForm handleSignup={handleSignup} />
        </Modal>
      </NavItem>
    </Navbar>
  );
};

export default NavbarComp;
