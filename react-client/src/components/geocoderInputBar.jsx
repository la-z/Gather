import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

// const Geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
// });
// // const AddressBar = () => (
// //   <h2>AddressBar</h2>
// // );
// // export default AddressBar;
// ReactDOM.render(
//   <Geocoder />,
//   // eslint-disable-next-line no-undef
//   document.getElementById('geocoder'),
// );

class Geocoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.setSearchInputElementReference = this.setSearchInputElementReference.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(submitEvent) {
    submitEvent.preventDefault();
    console.log('You Clicked Submit', submitEvent);
    this.setState({address: this.state.htmlFormAddress.value});
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
    })
    //geocoder.setInput('search', '2010 felicity st');
    console.log(geocoder.query);
  }

  setSearchInputElementReference(inputReference) {
    this.setState({ htmlFormAddress: inputReference });
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
          ref={this.setSearchInputElementReference}
          // required
        />
        <button type="submit">
          
Geocode Address
        </button>
      </form>
    );
  }
}

export default Geocoder;
