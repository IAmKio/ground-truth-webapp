import React from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api'
import { Container } from '@material-ui/core';

import HudDrawer from '../components/HudDrawer';

export default class GlobalMap extends React.Component {
  constructor(props) {
    super(props);

    this.googleMapLibraries = ['visualization']
    this.state = {
      isReady: false,
      markers: [],
      GoogleLatLngFn: null,
      map: null,
    }
  }

  componentDidUpdate() {
    console.log('Component GlobalMap updated:', this.props.loaded);
    console.log(this.props);

    if (this.props.hotspots.length > 0 && this.state.isReady) {
      this.state.markers = [];
      this.props.hotspots.forEach(hotspot => {
        const position = {
          lat: hotspot.geopoint._latitude,
          lng: hotspot.geopoint._longitude,
        }
        const thisMarker = new this.state.GoogleLatLngFn(position.lat, position.lng);
        this.state.markers.push(thisMarker);
      });
    }

    console.log(this.state.markers);
  }

  componentDidMount() {
    console.log('Component GlobalMap mounted.');

    setInterval(() => {
      console.log('Refreshing ...');
      this.setState({});
    }, 20000)
  }

  onLoad() {
    console.log('GM onLoad');
  }

  onUnmount() {
    console.log('GM onUnmount');
  }

  onDragEnd() {
    console.log('Drag end.');
  }

  render() {
    return (
      <Container
        id="global-map-container"
        maxWidth={false}>
        <Container id="hud" maxWidth="sm">
          <HudDrawer loaded={this.props.loaded}/>
        </Container>

        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyDW_dP3NjuXPjvBs0AXKOL2BuQ4susF3KU"
          libraries={this.googleMapLibraries}>
            <GoogleMap
              onDragEnd={this.onDragEnd}
              onLoad={map => {
                this.setState({
                  isReady: true,
                  GoogleLatLngFn: window.google.maps.LatLng,
                  map: map,
                });
              }}
              id='global-map'
              zoom={7}
              center={{
                lat: 51.3360,
                lng: 0.2674
              }}>

            <HeatmapLayer
              onLoad={this.onLoad}
              onUnmount={this.onUnmount}
              data={this.state.markers}
            />
          </GoogleMap>
        </LoadScript>
      </Container>
     )
  }
}