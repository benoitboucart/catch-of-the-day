import React from 'react';
import { formatPrice } from '../helpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeOrder = (
      <button onClick={() => this.props.removeFromOrder(key)}>
        &times;
      </button>
    );
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    }

    if(!fish || fish.status === `unavailable`){
      { /* Spread transitionOptions into this tag */ }
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available
            {removeOrder}
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
          </span>

          <span className="price">
            {formatPrice(fish.price * count)}
          </span>
          {removeOrder}
        </li>
      </CSSTransition>
    );
  }

  render = () => {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === `available`;
      if(isAvailable){
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your order</h2>
        <TransitionGroup
          component="ul"
          className="order"
        >
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <ul className="order">
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
        <p>{orderIds}</p>
      </div>
    )
  }
}

export default Order;
