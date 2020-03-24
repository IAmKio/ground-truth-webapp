import React from 'react';

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
    return <div>
      <GlobalMap
        loaded={this.state.loaded}
        hotspots={this.state.hotspots}
        announcements={this.state.announcements}
        statistics={this.state.statistics}
        layers={this.state.layers} />
    </div>
  }
}