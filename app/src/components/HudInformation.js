import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Hidden } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import CodeIcon from '@material-ui/icons/Code';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import AboutDialogContent from './AboutDialogContent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function HudInformation() {
  const classes = useStyles();
  const [aboutDialogOpen, setAboutDialogOpen] = React.useState(false);

  function handleClose() {
    setAboutDialogOpen(false)
  }

  function handleOpen() {
    setAboutDialogOpen(true)
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1" component="p">
              Ground Truth gives everyone the opportunity to report their symptoms anonymously for the benefit of others.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <DataUsageIcon />
            <Typography variant="subtitle1" component="p">
              <a rel="noopener noreferrer" href="https://github.com/IAmKio/ground-truth-api#where-can-i-get-the-data" target="_blank">Data</a>
            </Typography>
            <Hidden xsDown>
              <Typography variant="subtitle2" component="p">
                Get access. Free, for anyone.
              </Typography>
            </Hidden>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <CodeIcon />
            <Typography variant="subtitle1" component="p">
              <a rel="noopener noreferrer" href="https://github.com/IAmKio/ground-truth-webapp" target="_blank">Open</a>
            </Typography>
            <Hidden xsDown>
              <Typography variant="subtitle2" component="p">
                For everyone, by everyone, for free.
              </Typography>
            </Hidden>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <FavoriteIcon />
            <Typography variant="subtitle1" component="p">
              <a href="#about" onClick={handleOpen}>About</a>
            </Typography>
            <Hidden xsDown>
              <Typography variant="subtitle2" component="p">
                Why this exists, and who for.
              </Typography>
            </Hidden>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={aboutDialogOpen}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">

        <DialogTitle id="scroll-dialog-title">About</DialogTitle>
        <DialogContent dividers={true}>
          <AboutDialogContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}