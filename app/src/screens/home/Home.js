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

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import GlobalMap from '../../components/GlobalMap';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      announcements: [],
      hotspots: [],
      layers: [],
      statistics: []
    };
  }

  async componentDidMount() {
    console.log('Home component mounted.');

    const announcementsResponse = await fetch('https://api.groundtruth.app/announcements', {});
    const announcementsJson = await announcementsResponse.json();

    const hotspotsResponse = await fetch('https://api.groundtruth.app/hotspots', {});
    const hotspotsJson = await hotspotsResponse.json();

    const statisticsResponse = await fetch('https://api.groundtruth.app/statistics', {});
    const statisticsJson = await statisticsResponse.json();

    const layersResponse = await fetch('https://api.groundtruth.app/layers', {});
    const layersJson = await layersResponse.json();

    console.log('Layers JSON', layersJson);

    setTimeout(() => {
      this.setState({
        loaded: true,
        announcements: announcementsJson.announcements,
        hotspots: hotspotsJson.hotspots,
        statistics: statisticsJson.statistics,
        layers: layersJson.layers
      });
    }, 1000);
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        fontFamily: 'Roboto Mono, sans-serif',
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': 'Roboto Mono',
          },
        },
      },
    });

    return <div>
      <ThemeProvider theme={theme}>
        <GlobalMap
          loaded={this.state.loaded}
          hotspots={this.state.hotspots}
          announcements={this.state.announcements}
          statistics={this.state.statistics}
          layers={this.state.layers} />
        </ThemeProvider>
    </div>
  }
}