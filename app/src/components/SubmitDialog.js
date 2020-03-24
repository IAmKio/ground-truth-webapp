import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class SubmitDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      workingLayer: {},
      locationFound: false,
      allowSend: false
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

  geoSuccess() {
    console.log('Geo success!');

    this.setState({
      locationFound: true,
      allowSend: true
    });
  }

  geoError() {
    console.log('Geo error!');
  }

  handleClose() {
    console.log('Closed.');
    this.setState({
      open: false,
    });
  }

  LocationUiBundle(props) {
    console.log('LocationUiBundle', props);

    if (props.locationFound) {
      return <React.Fragment>
      <DialogContentText id="alert-dialog-description">
        We are ready!
      </DialogContentText>
      <LinearProgress variant="determinate" value={100}  />
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
        <this.LocationUiBundle locationFound={this.state.locationFound} />
      </DialogContent>
      <DialogActions>
        <Button disabled={this.state.allowSend ? false : true} onClick={this.handleClose.bind(this)} color="primary">
          Sent Report
        </Button>
      </DialogActions>
    </Dialog>
  }
}