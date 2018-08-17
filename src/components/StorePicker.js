import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  constructor() {
    super();
    // Make sure to make "this" available in goToStore function (or use goToStore as arrow function)
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(event) {
    event.preventDefault();
    // Grab text from box
    const text = this.storeInput.value;

    // Transition from / to /store/id
  }

  // goToStore = (e) => {
  //   e.preventDefault();
  //   console.log(`You changed URL`);

  //   // Grab text from box
  //   console.log(this);
  //   console.log(this.storeInput);
  //   // Transition from / to /store/id
  // }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* This is a comment in JSX */ }
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="Store name"
          defaultValue={getFunName()}
          ref={(input)=>{ this.storeInput = input }}
        />
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

export default StorePicker;
