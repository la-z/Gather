import React from 'react';
import ReactDOM from 'react-dom';


// Boiler taken from somewhere that allows appending of child
// might be extra steps but it works for now

const childComponentHook = ({ children }) => {  
  return ReactDOM.createPortal(
    children,
    document.getElementById('notification-box')
  );
};
export default childComponentHook;
