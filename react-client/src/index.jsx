/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  
  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);