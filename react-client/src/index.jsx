/* eslint import/extensions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar.jsx';
import Categories from './components/categories.jsx';
import EventList from './components/eventList.jsx';
import axios from 'axios';
// import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
  return (
      <div>
        <h1>Gather</h1>
        <Navbar />
        <Categories />
        <EventList />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
