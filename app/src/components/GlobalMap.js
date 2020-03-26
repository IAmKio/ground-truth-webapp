// Copyright 2020 Kieran Goodary, Digital Industria Ltd
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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