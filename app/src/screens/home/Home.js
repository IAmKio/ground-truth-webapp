import React from 'react';

import GlobalMap from '../../components/GlobalMap';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    console.log('Home component mounted.');

    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 1000);
  }

  render() {
    return <div>
      <GlobalMap loaded={this.state.loaded} />
    </div>
  }
}