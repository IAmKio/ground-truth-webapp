import React from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api'
import { Container } from '@material-ui/core';

import HudDrawer from '../components/HudDrawer';

export default class GlobalMap extends React.Component {
  constructor(props) {
    super(props);

    this.googleMapLibraries = ['visualization'];
    this.state = {
      isReady: false,
      markers: [],
      GoogleLatLngFn: null,
      map: null,
      currentLat: 51.3360,
      currentLong: 0.2674,
      vertical: 'top',
      horizontal: 'center',
    }
  }

  componentDidUpdate(previousProps) {
    console.log('Component GlobalMap updated:', this.props.loaded);
    console.log(this.props);

    const builtMakers = [];

    if (this.props.hotspots.length > 0 && this.state.isReady) {
      this.props.hotspots.forEach(hotspot => {
        const position = {
          lat: hotspot.geopoint._latitude,
          lng: hotspot.geopoint._longitude,
        }
        const thisMarker = { location: new this.state.GoogleLatLngFn(position.lat, position.lng), weight: 5 };
        builtMakers.push(thisMarker);
      });
    }

    if (previousProps !== this.props) {
      console.log('Drawing heat:', builtMakers);

      this.setState({
        markers: builtMakers,
      });
    }
  }

  componentDidMount(previousProps) {
    console.log('Component GlobalMap mounted.');

    if (previousProps !== this.props) {
      this.setState({});
    }
  }

  onSnackbarClose(event, reason) {
    console.log('Snackbar closed.');
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
          <HudDrawer
            loaded={this.props.loaded}
            statistics={this.props.statistics}
            layers={this.props.layers} />
        </Container>

        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyDW_dP3NjuXPjvBs0AXKOL2BuQ4susF3KU"
          libraries={this.googleMapLibraries}>
            <GoogleMap
              options={{
                maxZoom: 10,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeId: 'satellite'
              }}
              onDragEnd={this.onDragEnd.bind(this)}
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
                lat: this.state.currentLat,
                lng: this.state.currentLong
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