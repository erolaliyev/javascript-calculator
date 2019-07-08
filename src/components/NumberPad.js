import React from 'react';

const NumberPad = props => {
  return (
    <div>
      <button onClick={props.onClick} id={props.id}>
        {props.value}
      </button>
    </div>
  );
};

export default NumberPad;
