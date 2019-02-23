import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
// import geojson from '../mockGeoJson.js';
// import ReactMapboxGl from 'react-mapbox-gl';


// https://tools.ietf.org/html/rfc7159

mapboxgl.accessToken = 'pk.eyJ1IjoiY3NrbGFkeiIsImEiOiJjanNkaDZvMGkwNnFmNDRuczA1cnkwYzBlIn0.707UUYmzztGHU2aVoZAq4g';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.event.long,
      lat: this.props.event.lat,
      zoom: 17,
    };
  }

  componentDidMount() {
    // this.setState({ points: {lati: this.props.event.lat, long: this.props.event.long} });
    const { lng, lat, zoom } = this.state;
    const { title } = this.props.event;
    // console.log(lati, long);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
    });
    // map.on('style.load', () => {
    //   map.addSource('geojson', { type: 'geojson', data: '../mockGeoJson.geojson' });
    // });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    // add markers to map
    // geojson.features.forEach((marker) => {
    //   console.log(marker);
    //   // create a HTML element for each feature
    //   const el = React.createElement('div');
    //   el.className = 'marker';

    //   // make a marker for each feature and add to the map
    //   new mapboxgl.Marker(el)
    //     .setLngLat(marker.geometry.coordinates)
    //     .addTo(map);
    // });


    map.on('load', () => {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [lng, lat],
              },
              properties: {
                title: `${title}`,
                icon: 'harbor',
              },
            }],
          },
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={(el) => { this.mapContainer = el; }} className="absolute top right left bottom" />
      </div>
    );
  }
}
export default Map;
