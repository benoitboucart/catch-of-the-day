import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header cool={true} tagline="Fresh BNWA" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
