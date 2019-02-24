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
      address: '',
      date: '',
      duration: '',
      privateEvent: false,
      category: '',
    };
    this.setGeocodeSearch = this.setGeocodeSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.chckBoxFunc = this.chckBoxFunc.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  handleFormSubmit(submitEvent) {
    const { title, description, address, date, duration } = this.state;
    let { privateEvent } = this.state;
    submitEvent.preventDefault();
    console.log('You Clicked Submit', submitEvent);
    /*
    {                    api address               } / {         address in english      } .json ? {        access token       }
    http://api.mapbox.com/geocoding/v5/mapbox.places/2539 Columbus st new orleans la 70113.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g
    */
    if (privateEvent === 'yes' || privateEvent === 'y') { privateEvent = true; }
    if (privateEvent !== 'yes' || privateEvent !== 'y') { privateEvent = false; }
    axios.get(` http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
      .then((geocodedResults) => {
        const latNlongArr = geocodedResults.data.features[0].center;
        this.setState({geocodedLong: latNlongArr[0], geocodedLat: latNlongArr[1]});
        
        const params = {
          title,
          description,
          lat: latNlongArr[1],
          long: latNlongArr[0],
          date,
          duration,
          privateEvent,
        };
        axios.put('/events', params)
          .then((result) => { console.log(result);
          this.props.redirect(); 
        });
      });
  }

  setGeocodeSearch(e) {
    this.setState({ address: e.target.value });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }

  handleDurationChange(e) {
    this.setState({ duration: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({
      category: e.target.value
    });
  }

  chckBoxFunc(e) {
    this.setState({ privateEvent: e.target.value.toLowerCase() });
  }

  render() {
    const { address, duration, title, date, description, category } = this.state;
    return (
      <form className="form-inline" onSubmit={this.handleFormSubmit}>
        <input type="text" name="address" placeholder="address" value={address} onChange={this.setGeocodeSearch} />
        <input type="text" name="duration" placeholder="duration in number of hours" value={duration} onChange={this.handleDurationChange} />
        <input type="text" name="category" placeholder="Category" value={category} onChange={this.handleCategoryChange} />
        <input type="text" name="title" placeholder="Title" value={title} onChange={this.handleTitleChange} />
        <input type="date" name="date" placeholder="Date" value={date} onChange={this.handleDateChange} />
        <input type="text" name="description" placeholder="Description" value={description} onChange={this.handleDescriptionChange} />
        <input type="text" name="privateEvent" placeholder="yes or no" onChange={this.chckBoxFunc} />
        <Button type="submit">
          Submit Event
        </Button>
      </form>
    );
  }
}

export default Geocoder;
