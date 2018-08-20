import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     fishes: {},
  //     order: {}
  //   };
  // }

  state = { // Using a property to set state
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object.isRequired
  };

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

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null; // no delete, doesn't work in Firebase
    this.setState({ fishes })
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key]+1 || 1;
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key]; // can be deleted, because not synced with Firebase
    this.setState({ order });
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App;
