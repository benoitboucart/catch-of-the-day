import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish = (fish) => {
    // Update our state
    // Use spread operator to copy fishes and make new object
    const fishes = {...this.state.fishes};
    fishes[`fish-${Date.now()}`] = fish;

    // Set state
    this.setState({ fishes }); // { fishes: fishes }
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header cool={true} tagline="Fresh BNWA" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
