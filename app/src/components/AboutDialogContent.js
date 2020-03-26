import React from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function AboutDialogContent() {
  return (
    <React.Fragment>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={-1}>
          Ground Truth is a suite of apps and services that aim to crowd-source symptom data for the benefit of others. The data captured is free for anyone to read and use in their research or systems. Ground Truth is a data tool, and is not interested in capturing any possibly personally identifying information.
      </DialogContentText>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={0}>
          Our mission is to provide the data to map global disease and infection movement across the globe. This data is used by medical institutions, organisations, data scientists, non-governmental and governmental organisations to further the study, protection and longevity of biological life. The data you provide us is incredibly valuable, and we are thankful for your contributions.
      </DialogContentText>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={1}>
          All our data is free and public. It's available for anyone to use, any time. You can view links to the data <a href="https://github.com/IAmKio/ground-truth-api#where-can-i-get-the-data" target="_blank">here</a>.
      </DialogContentText>
    </React.Fragment>
  );
}
