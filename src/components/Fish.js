import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render(){
    const { details } = this.props;
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p className="fish-desc">{details.desc}</p>
        <button disabled={!details.isAvailable}>
          { /* Could also make a handleClick function like the above */}
          {details.isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
