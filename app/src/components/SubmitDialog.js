import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from '@material-ui/core/Icon';

export default class SubmitDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      workingLayer: {},
      locationFound: false,
      location: null,
      allowSend: false,
      showError: false,
    };
  }

  componentDidMount() {
    console.log('Component Submit Dialog did mount.');
    console.log(this.state);
  }

  componentDidUpdate(previousProps) {
    console.log('Component Submit Dialog did update.');
    console.log('Previous Props', previousProps);
    console.log('New Props', this.props);
    if (previousProps !== this.props) {
      this.setState({
        workingLayer: this.props.layer || {},
        open: this.props.open
      });
    }

    if (this.state.open) {
      console.log('Attempting to find geolocation...');
      navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoError.bind(this));
    }
  }

  geoSuccess(position) {
    console.log('Geo success!');
    console.log('Reporting with UID:', window.firebaseUser.uid);

    this.setState({
      locationFound: true,
      allowSend: true,
      location: position,
    });
  }

  geoError() {
    console.log('Geo error!');

    this.setState({
      locationFound: false,
      allowSend: false,
      showError: true,
    });
  }

  handleClose() {
    console.log('Closed.');
    this.setState({
      open: false,
    });
  }

  async handleSend() {
    console.log('Sending...');

    const response = await fetch('https://api.groundtruth.app/ingest', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      body: JSON.stringify({
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        anonymousUserId: window.firebaseUser.uid,
        layerId: this.state.workingLayer.layerId,
      })
    });
    const reportJson = await response.json();
    console.log('Report Response:', reportJson);
  }

  LocationUiBundle(props) {
    console.log('LocationUiBundle', props);

    if (props.locationFound) {
      return <React.Fragment>
      <DialogContentText id="alert-dialog-description">
        <b>We are ready!</b>
      </DialogContentText>
      <LinearProgress variant="determinate" value={100}  />
    </React.Fragment>
    }

    if (props.showError) {
      return <React.Fragment>
      <DialogContentText id="alert-dialog-description">
        <b>Sorry, we had an issue trying to get your location.</b>
      </DialogContentText>
      <DialogContentText id="alert-dialog-description">
        You or your device may have blocked Ground Truth from obtaining your location. Please check your 
        settings to remove this restriction and try again.
      </DialogContentText>
      <LinearProgress variant="determinate" value={100} color="secondary" />
    </React.Fragment>
    }

    return <React.Fragment>
      <DialogContentText id="alert-dialog-description">
        We're just working on getting your location...
      </DialogContentText>
      <LinearProgress />
    </React.Fragment>;
  }

  render() {
    console.log('Rendering Submit Dialog...');
    return <Dialog
      ref="submitDialog"
      open={this.state.open}
      onClose={this.handleClose.bind(this)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Report {this.state.workingLayer.friendlyName}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {this.state.workingLayer.shortDescription}
        </DialogContentText>
        <this.LocationUiBundle
          locationFound={this.state.locationFound}
          showError={this.state.showError}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={this.state.allowSend ? false : true} 
          onClick={this.handleSend.bind(this)}
          color="primary"
          endIcon={<Icon>send</Icon>}>
          Send Report
        </Button>
      </DialogActions>
    </Dialog>
  }
}