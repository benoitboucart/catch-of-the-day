import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  handleChange = (e, key) => {
    const fish = this.props.fishes[key];
    // Take copy of fish & update with new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory = (key) => {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" onChange={e => this.handleChange(e, key)} value={fish.name} />
        <input type="number" name="price" onChange={e => this.handleChange(e, key)} value={fish.price} />
        <select type="text" name="status" onChange={e => this.handleChange(e, key)} value={fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" onChange={e => this.handleChange(e, key)} value={fish.desc}></textarea>
        <input type="text" name="image" onChange={e => this.handleChange(e, key)} value={fish.image} />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    );
  }

  render = () => {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample fish</button>
      </div>
    )
  }
}

export default Inventory;
