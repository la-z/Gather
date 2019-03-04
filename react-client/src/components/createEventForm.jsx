import React from 'react';
import axios from 'axios';
import { Button } from 'react-materialize';
import Input from 'react-materialize/lib/Input';
import moment from 'moment';

class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geocodedLat: null,
      geocodedLong: null,
      categories: {},
      title: '',
      description: '',
      address: '',
      date: '',
      duration: '',
      category: '',
      time: '',
      datetime: '',
    };
    this.setGeocodeSearch = this.setGeocodeSearch.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.processDatetime = this.processDatetime.bind(this);
  }

  componentDidMount() {
    
  }

  // eslint-disable-next-line react/sort-comp
  handleFormSubmit(submitEvent) {
    const { title, description, address, date, duration, category, categories } = this.state;
    submitEvent.preventDefault();
    console.log('You Clicked Submit', submitEvent);
    /*
    {                    api address               } / {         address in english      } .json ? {        access token       }
    http://api.mapbox.com/geocoding/v5/mapbox.places/2539 Columbus st new orleans la 70113.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g
    */
    axios.get(` http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g`)
      .then((geocodedResults) => {
        const latNlongArr = geocodedResults.data.features[0].center;
        this.setState({geocodedLong: latNlongArr[0], geocodedLat: latNlongArr[1]});

        const params = {
          title,
          description,
          lat: latNlongArr[1],
          long: latNlongArr[0],
          time: moment(this.processDatetime()).format(),
          duration,
          categories,
        };
        axios.put('/events', params)
          .then((result) => { console.log(result);
            this.props.redirect();
          })
          .catch((err) => { console.log(err); });
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

  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }

  handleDurationChange(e) {
    this.setState({ duration: e.target.value });
  }

  handleCategoryChange(e) {
    console.log(e.target.value);
    this.setState({
      category: e.target.value,
    });
  }

  processDatetime() {
    // convert our time and date into RFC 2822 date time format
    const { time, date } = this.state;
    let parsedDate = date.replace(',', '').split(' ');
    parsedDate[1] = parsedDate[1].slice(0, 3);
    parsedDate = parsedDate.join(' ');
    let parsedTime = time.slice(0, 5);
    if (time.slice(5) === 'PM' && time.slice(0, 2) !== '12') {
      const hours = (Number(parsedTime.slice(0, 2)) + 12).toString();
      parsedTime = hours + parsedTime.slice(2);
    } else if (time.slice(5) === 'AM' && time.slice(0, 2) === '12') {
      parsedTime = `00${parsedTime.slice(2)}`;
    }
    const parsedDateTime = `${parsedDate} ${parsedTime} CST`;
    return parsedDateTime;
  }

  editEvent() {
    const { editEvent } = this.props;
    console.log('editing event');
    editEvent();
  }


  render() {
    const { categories } = this.props;
    const { address, duration, title, date, time, description } = this.state;
    const categoriesToAdd = {};
    function changeCategories(e) {
      if (categoriesToAdd[e.target.value]) {
        delete categoriesToAdd[e.target.value];
      } else {
        categoriesToAdd[e.target.value] = e.target.value;
      }
    }
    const submit = (event) => {
      event.preventDefault();
      this.setState({ categories: categoriesToAdd }, () => {
        // console.log(this.state.categories);
        this.handleFormSubmit(event);
      });
    }

    return (
      <form className="form-inline" onSubmit={submit}>
        {/* <Input required type="select" onChange={this.handleCategoryChange} label="Category">
          {categories.map(category => <option value={category.name}>{category.name}</option>)}
        </Input> */}
        {categories.map((category) => {
          return (
            <div>
              <Input name="group1" type="checkbox" value={category.name} label={category.name} onChange={changeCategories} />
            </div>
          );
        })}

        <input required type="text" name="address" placeholder="address" value={address} onChange={this.setGeocodeSearch} />
        <input required type="text" name="duration" placeholder="duration in number of hours" value={duration} onChange={this.handleDurationChange} />
        <input required type="text" name="title" placeholder="Title" value={title} onChange={this.handleTitleChange} />
        <Input required type="date" name="date" placeholder="Date" value={date} onChange={this.handleDateChange} />
        <Input required type="time" name="time" placeholder="Time" value={time} onChange={this.handleTimeChange} />
        <input required type="text" name="description" placeholder="Description" value={description} onChange={this.handleDescriptionChange} />
        <Button className="orange darken-3" type="submit">
          Submit Event
        </Button>
      </form>
    );
  }
}

export default Geocoder;
