import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render(){
    const { details, index } = this.props;
    const isAvailable = details.status == `available`;
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
