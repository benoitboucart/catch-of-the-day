import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    })
  };

  handleChange = (e, key) => {
    const fish = this.props.fishes[key];
    // Take copy of fish & update with new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const storeRef = await base.fetch(this.props.storeId, { context: this });
    console.log(storeRef);
    // 2. Claim it if there is no owner
    if (!storeRef.owner) {
      // Save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: storeRef.owner || authData.user.uid
    })
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

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
        <button onClick={() => this.props.deleteFish(key)}>
          Remove Fish
        </button>
      </div>
    );
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manager your store's inventory</p>
        <button
          className="github"
          onClick={() => this.authenticate('Github')}
        >
          Log in with Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate('Facebook')}
        >
          Log in with Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate('Twitter')}
        >
          Log in with Twitter
        </button>
      </nav>
    );
  }

  render = () => {
    const logout = <button onClick={this.logout}>Log out</button>

    // check if they are not logged in at all
    if(!this.state.uid){
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current store
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you aren't the owner of the store.</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load sample fish</button>
      </div>
    )
  };
}

export default Inventory;
