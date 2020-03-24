import React from 'react';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import SubmitDialog from './SubmitDialog';

export default class HudDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.loaded = props.loaded;

    this.state = {
      showSubmitDialog: false
    };
  }

  componentDidMount() {
    console.log('Component HUD Drawer did mount.');
  }

  componentDidUpdate() {
    console.log('Component HUD Drawer did update.');
    console.log(this.props);
  }

  launchSubmitDialog(layer) {
    console.log('layer', layer);
    this.setState({
      showSubmitDialog: true,
      workingLayer: layer
    });
  }

  render() {
    return (
      <React.Fragment>
        <SubmitDialog layer={this.state.workingLayer} open={this.state.showSubmitDialog} />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Ground Truth Network {this.props.loaded ? '- Connected' : ''}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Ground Truth gives everyone the opportunity to report their symptoms anonymously for the benefit of others.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Icon>my_location</Icon>
              </Grid>
              <Grid item>
                 <b>&nbsp;&nbsp;REPORT NOW</b>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
            {
              this.props.layers.map(layer => {
              return <Grid item xs={12}>
                <Typography gutterBottom><b>{layer.friendlyName} ({layer.technicalName})</b><br />{layer.shortDescription}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.launchSubmitDialog(layer)}
                  endIcon={<Icon>send</Icon>}>
                  Report
                </Button>
              </Grid>
              })
            }
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography>Statistics</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
            {
              this.props.statistics.map(statistic => {
              return <Grid item xs={12}><Typography><b>{statistic.name}: {statistic.count}</b><br />{statistic.description}</Typography></Grid>
              })
            }
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    )
  }
}