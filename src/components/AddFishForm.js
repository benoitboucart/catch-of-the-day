import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired
  }

  createFish = e => {
    e.preventDefault();
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    }
    this.props.addFish(fish);
    this.fishForm.reset();
  };

  render = () => {
    return (
      <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.createFish}>
        <input ref={(input) => this.name = input} name="name" type="text" placeholder="Name" />
        <input ref={(input) => this.price = input} name="price" type="number" placeholder="Price" />
        <select ref={(input) => this.status = input} name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} name="desc" placeholder="Desc"/>
        <input ref={(input) => this.image = input} name="image" type="text" placeholder="Image"/>
        <button type="submit">+ Add Fish</button>
      </form>
    )
  };
}

export default AddFishForm;
