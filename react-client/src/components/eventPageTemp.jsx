import React from 'react';
//import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Map from './map.jsx';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    return(
      <Map />
    );  
  }
}
export default EventPage;
