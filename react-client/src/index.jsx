/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import PropTypes from 'prop-types';

class App extends React.Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {

    };
  }

  
=======
  constructor(props) {
    super(props);
    this.state = {};
  }

>>>>>>> 2e321a7f0ef4c71d81e294cca87a96582507ed3f
  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
