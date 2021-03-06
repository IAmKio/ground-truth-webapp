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
import { DialogContentText } from '@material-ui/core';

export default function AboutDialogContent() {
  return (
    <>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={-1}
      >
        Ground Truth is a suite of apps and services that
        aim to crowd-source symptom data for the benefit of
        others. The data captured is free for anyone to
        read and use in their research or systems. Ground
        Truth is a data tool, and is not interested in
        capturing any possibly personally identifying information.
      </DialogContentText>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={0}
      >
        Our mission is to provide the data to map global disease
        and infection movement across the globe. This data is
        used by medical institutions, organisations, data scientists,
        non-governmental and governmental organisations to further
        the study, protection and longevity of biological life.
        The data you provide us is incredibly valuable, and we are
        thankful for your contributions.
      </DialogContentText>
      <DialogContentText
        id="scroll-dialog-description"
      >
        All our data is free and public. It&apos;s available for anyone
        to use, any time. You can view links to the data
        <a href="https://github.com/IAmKio/ground-truth-api#where-can-i-get-the-data" rel="noopener noreferrer" target="_blank"> here</a>
        .
      </DialogContentText>
    </>
  );
}
