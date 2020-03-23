import React from 'react';

import GlobalMap from '../../components/GlobalMap';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      announcements: [],
      hotspots: [],
      layers: []
    };
  }

  async componentDidMount() {
    console.log('Home component mounted.');

    const announcementsResponse = await fetch('https://api.groundtruth.app/announcements', {});
    const announcementsJson = await announcementsResponse.json();

    const hotspotsResponse = await fetch('https://api.groundtruth.app/hotspots', {});
    const hotspotsJson = await hotspotsResponse.json();

    console.log('Hotspots JSON', hotspotsJson);


    setTimeout(() => {
      this.setState({
        loaded: true,
        announcements: announcementsJson.announcements,
        hotspots: hotspotsJson.hotspots
      });
    }, 1000);
  }

  render() {
    return <div>
      <GlobalMap
        loaded={this.state.loaded}
        hotspots={this.state.hotspots}
        announcements={this.state.announcements} />
    </div>
  }
}