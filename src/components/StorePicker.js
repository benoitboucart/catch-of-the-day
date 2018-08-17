import React from 'react';
//import { getFunName } from '../helpers';
import * as helpers from '../helpers';
import { PropTypes  } from 'prop-types';
class StorePicker extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  goToStore = e => {
    // If you write this function as goToStore(e) {...
    // then in order to use 'this' inside of it,
    // you need to bind this function to the component using the constructor function above
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. Get the text form that input
    const storeName = this.storeInput.value;
    // 3. Change the page to /store/whatever-they-entered
    // Can use history.push because it's a prop passed to StorePicker from Router
    this.props.history.push(`/store/${storeName}`); // React Router renders the right component for this
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* This is a comment in JSX */ }
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="Store name"
          defaultValue={helpers.getFunName()}
          ref={(input)=>{ this.storeInput = input }}
        />
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

export default StorePicker;
