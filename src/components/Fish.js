import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

  static propTypes = { // Because it's a component, you put propTypes here
    details: PropTypes.shape({ // Because it's an object full of data
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
  }

  render(){
    const { details, index } = this.props;
    const isAvailable = details.status === `available`;
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p className="fish-desc">{details.desc}</p>
        <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
