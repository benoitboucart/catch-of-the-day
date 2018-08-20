import React from 'react';
import PropTypes from 'prop-types';

/*
 * Stateless functional component
 * */
const Header = props => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
        </h1>
      <h3 className="tagline">
        <span>
          {props.tagline}
        </span>
      </h3>
    </header>
  )
};

Header.propTypes = { // Header is not a regular component, so you put propTypes here
  tagline: PropTypes.string.isRequired
}

export default Header;
