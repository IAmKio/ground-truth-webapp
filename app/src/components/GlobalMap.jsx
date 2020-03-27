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
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import { Container } from '@material-ui/core';

import HudDrawer from './HudDrawer';

export default class GlobalMap extends React.Component {
  constructor(props) {
    super(props);

    this.googleMapLibraries = ['visualization'];
    this.state = {
      isReady: false,
      markers: [],
      GoogleLatLngFn: null,
      currentLat: 51.3360,
      currentLong: 0.2674,
    };
  }

  componentDidMount(previousProps) {
    console.log('Component GlobalMap mounted.');

    if (previousProps !== this.props) {
      this.setState({});
    }
  }

  componentDidUpdate(previousProps) {
    const builtMakers = [];
    const { hotspots } = this.props;
    const { isReady, GoogleLatLngFn } = this.state;

    if (hotspots.length > 0 && isReady) {
      hotspots.forEach((hotspot) => {
        const { geopoint } = hotspot;
        const position = {
          lat: geopoint._latitude, // eslint-disable-line
          lng: geopoint._longitude, // eslint-disable-line
        };
        const thisMarker = {
          location: new GoogleLatLngFn(position.lat, position.lng),
          weight: 5,
        };
        builtMakers.push(thisMarker);
      });
    }

    if (previousProps !== this.props) {
      console.log('Drawing heat:', builtMakers);

      this.setState({ // eslint-disable-line
        markers: builtMakers,
      });
    }
  }

  render() {
    const { loaded, statistics, layers } = this.props;
    const { markers, currentLat, currentLong } = this.state;
    return (
      <Container
        id="global-map-container"
        maxWidth={false}
      >
        <Container id="hud" maxWidth="sm">
          <HudDrawer
            loaded={loaded}
            statistics={statistics}
            layers={layers}
          />
        </Container>

        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyDW_dP3NjuXPjvBs0AXKOL2BuQ4susF3KU"
          libraries={this.googleMapLibraries}
        >
          <GoogleMap
            options={{
              maxZoom: 10,
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeId: 'satellite',
            }}
            onDragEnd={this.onDragEnd}
            onLoad={() => {
              this.setState({
                isReady: true,
                GoogleLatLngFn: window.google.maps.LatLng,
              });
            }}
            id="global-map"
            zoom={7}
            center={{
              lat: currentLat,
              lng: currentLong,
            }}
          >
            <HeatmapLayer
              onLoad={this.onLoad}
              onUnmount={this.onUnmount}
              data={markers}
            />
          </GoogleMap>
        </LoadScript>
      </Container>
    );
  }
}

GlobalMap.defaultProps = {
  loaded: false,
  statistics: [],
  layers: [],
  hotspots: [],
};

GlobalMap.propTypes = {
  loaded: PropTypes.bool,
  statistics: PropTypes.arrayOf(PropTypes.shape({})),
  layers: PropTypes.arrayOf(PropTypes.shape({})),
  hotspots: PropTypes.arrayOf(PropTypes.shape({})),
};
