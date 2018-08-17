import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount = () => {
    // This runs before <App/> is rendered
    console.log(this.props);
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: `fishes`
    });

    // Check if any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);
    if(localStorageRef){
      // update our <App> component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }
  componentWillUnmount = () => {
    base.removeBinding(this.ref);
  }

  componentWillUpdate = (nextProps, nextState) => {
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order))
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

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key]+1 || 1;
    this.setState({ order });
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header cool={true} tagline="Fresh BNWA" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
