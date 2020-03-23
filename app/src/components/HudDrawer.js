import React from 'react';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';


export default class HudDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.loaded = props.loaded;
  }

  componentDidMount() {
    console.log('Component HUD Drawer did mount.');
  }

  componentDidUpdate() {
    console.log('Component HUD Drawer did update.');
  }

  render() {
    return (
      <React.Fragment>
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
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Statistics</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    )
  }
}