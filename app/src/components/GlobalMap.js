import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Container } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
          <Card className="card-pane">
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Ground Truth Network
              </Typography>
              <Typography component="p">
                Ground Truth gives everyone the opportunity to report their symptoms anonymously for the benefit of others.
              </Typography>
              <Typography variant="body2" component="p">
                
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Report</Button>
            </CardActions>
          </Card>

          <Card className="card-pane">
            <CardContent>
              <Typography variant="h5" component="p">
                Connected.
              </Typography>
              <Typography component="p">
                You're anonymously connected to our network.
              </Typography>
            </CardContent>
          </Card>
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