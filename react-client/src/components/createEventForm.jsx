import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodedLat: null,
      geocodedLong: null,
      title: '',
      description: '',
    };
    this.setGeocodeSearch = this.setGeocodeSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  handleFormSubmit(submitEvent) {
    const { title, description, } = this.state;
    submitEvent.preventDefault();
    console.log('You Clicked Submit', submitEvent);
    this.setState({address: this.state.htmlFormAddress});
    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    // })
    // //geocoder.setInput('search', 'New orleans, LA, 70113');
    // console.log(geocoder.query);
    /*
    {                    api address               } / {         address in english      } .json ? {        access token       }
    http://api.mapbox.com/geocoding/v5/mapbox.places/2539 Columbus st new orleans la 70113.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g
    */
   axios.get(` http://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.htmlFormAddress.value}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
    .then((geocodedResults) => {
      const latNlongArr = geocodedResults.data.features[0].center;
      this.setState({geocodedLong: latNlongArr[0], geocodedLat: latNlongArr[1]});
    })
    console.log(title, description);
  }

  setGeocodeSearch(inputReference) {
    this.setState({ htmlFormAddress: inputReference.value });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
      Address: 
        <input
          type="text"
          className="form-control input-lg"
          id="address"
          placeholder="1337 nerd lane"
          ref={this.setGeocodeSearch}
          // required
        />
        <input type="text" name="title" placeholder="Amazing Fun Event" value={this.state.title} onChange={this.handleTitleChange} />
        <input type="text" name="title" placeholder="Amazing Fun Event" value={this.state.description} onChange={this.handleDescriptionChange} />
      
        <Button type="submit">
          Submit Event
        </Button>
      </form>
    );
  }
}

export default Geocoder;
