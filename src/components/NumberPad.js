import React from 'react';
import PropTypes from 'prop-types';

const NumberPad = props => (
  <button onClick={props.onClick} id={props.id}>
    {props.value}
  </button>
);

NumberPad.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string
};

export default NumberPad;
