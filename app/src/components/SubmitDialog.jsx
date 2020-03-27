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

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';


export default class SubmitDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateOpen: false,
      workingLayer: {},
      locationFound: false,
      location: null,
      allowSend: false,
      showError: false,
      sending: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentDidMount() {
    console.log('Component Submit Dialog did mount.');
    console.log(this.state);
  }

  componentDidUpdate(previousProps) {
    console.log('Component Submit Dialog did update.');
    console.log('Previous Props', previousProps);
    console.log('New Props', this.props);

    const { stateOpen } = this.state;
    const { layer, open } = this.props;

    if (previousProps !== this.props) {
      this.setState({ // eslint-disable-line
        workingLayer: layer || {},
        stateOpen: open,
      });
    }

    if (stateOpen) {
      console.log('Attempting to find geolocation...');
      navigator
        .geolocation
        .getCurrentPosition(this.geoSuccess.bind(this), this.geoError.bind(this));
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
      stateOpen: false,
    });
  }

  async handleSend() {
    console.log('Sending...');

    this.setState({
      allowSend: false,
      sending: true,
    });
    const { location, workingLayer } = this.state;
    const { coords } = location;

    const { latitude, longitude } = coords;

    const response = await fetch('https://api.groundtruth.app/ingest', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        anonymousUserId: window.firebaseUser.uid,
        layerId: workingLayer.layerId,
      }),
    });
    const reportJson = await response.json();
    console.log('Report Response:', reportJson);

    this.setState({
      stateOpen: false,
    });
  }

  LocationUiBundle(props) {
    console.log('LocationUiBundle', props);
    console.log(this);

    if (props.locationFound && props.sending) {
      const ColorLinearProgress = makeStyles({
        colorPrimary: {
          backgroundColor: '#03DAC6',
        },
        barColorPrimary: {
          backgroundColor: '#ffffff',
        },
      });

      const classes = ColorLinearProgress();
      return (
        <>
          <DialogContentText id="alert-dialog-description">
            <b>Reporting...</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Thank you - reporting symptoms helps on a global scale.
          </DialogContentText>
          <LinearProgress
            classes={{
              colorPrimary: classes.colorPrimary,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        </>
      );
    }

    if (props.locationFound) {
      return (
        <>
          <DialogContentText id="alert-dialog-description">
            <b>We are ready!</b>
          </DialogContentText>
          <LinearProgress variant="determinate" value={100} />
        </>
      );
    }

    if (props.showError) {
      return (
        <>
          <DialogContentText id="alert-dialog-description">
            <b>Sorry, we had an issue trying to get your location.</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            You or your device may have blocked Ground Truth from
            obtaining your location. Please check your
            settings to remove this restriction and try again.
          </DialogContentText>
          <LinearProgress variant="determinate" value={100} color="secondary" />
        </>
      );
    }

    return (
      <>
        <DialogContentText id="alert-dialog-description">
          We&apos;re just working on getting your location...
        </DialogContentText>
        <LinearProgress />
      </>
    );
  }

  render() {
    console.log('Rendering Submit Dialog...');
    const {
      stateOpen, workingLayer, locationFound, showError, allowSend, sending,
    } = this.state;
    const { friendlyName, shortDescription } = workingLayer;
    return (
      <Dialog
        open={stateOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Report&nbsp;
          {friendlyName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {shortDescription}
          </DialogContentText>
          <this.LocationUiBundle
            locationFound={locationFound}
            showError={showError}
            sending={sending}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!allowSend}
            onClick={this.handleSend}
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Send Report
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SubmitDialog.defaultProps = {
  layer: null,
  open: false,
};

SubmitDialog.propTypes = {
  layer: PropTypes.shape({}),
  open: PropTypes.bool,
};
