import React from 'react';
import ReactDOM from 'react-dom';


const NotificationBox = ({ children }) => {  
  return ReactDOM.createPortal(
    children,
    document.getElementById('notification-box')
  );
};
export default NotificationBox;
