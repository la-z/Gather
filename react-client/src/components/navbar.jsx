/* eslint-disable import/extensions, react/prop-types */
import React from 'react';
import {
  Button,
  Icon,
  Navbar,
  NavItem,
  Modal,
} from 'react-materialize';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

const NavbarComp = ({
  loggedin,
  clickHome,
  clickCreateEvent,
  clickMyEvents,
  clickSignout,
  handleLogin,
  handleSignup,
  username,
}) => {
  if (loggedin) {
    return (
      <Navbar className="navbar" brand="logo" right>
        <NavItem onClick={() => {}}>Welcome back, {username}!</NavItem>
        <NavItem onClick={clickHome}>Home</NavItem>
        <NavItem onClick={clickMyEvents}>
          MyEvents
          <Icon right>cloud</Icon>
        </NavItem>
        <NavItem onClick={clickSignout}>
          Logout
          <Icon right>cloud</Icon>
        </NavItem>
        <Button floating large className="green" waves="light" icon="add" onClick={clickCreateEvent} />
      </Navbar>
    );
  }
  return (
    <Navbar className="navbar" brand="logo" right>
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
      {/* for some reason NavItems were not aligning correctly without this ugly hack */}
      <NavItem>
        <Modal
          trigger={<NavItem>Signup</NavItem>}
          header="Signup"
        >
          <SignupForm handleSignup={handleSignup} />
        </Modal>
      </NavItem>
      <Button floating large className="green" waves="light" icon="add" onClick={clickCreateEvent} />
    </Navbar>
  );
};

export default NavbarComp;
