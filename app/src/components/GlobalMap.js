import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Container } from '@material-ui/core';

import HudDrawer from '../components/HudDrawer';

export default class GlobalMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container
        id="global-map-container"
        maxWidth={false}>
        <Container id="hud" maxWidth="sm">
          <HudDrawer />
        </Container>

        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyDW_dP3NjuXPjvBs0AXKOL2BuQ4susF3KU"
        >
          <GoogleMap
            id='global-map'
            zoom={7}
            center={{
              lat: -3.745,
              lng: -38.523
            }}>
          </GoogleMap>
        </LoadScript>
      </Container>
     )
  }
}