import React, { useState } from 'react';
import NumberPad from './NumberPad';

const buttons = [
  {
    value: `1`,
    id: `one`
  },
  {
    value: `2`,
    id: `two`
  },
  {
    value: `3`,
    id: `three`
  },
  {
    value: `4`,
    id: `four`
  },
  {
    value: `5`,
    id: `five`
  },
  {
    value: `6`,
    id: `six`
  },
  {
    value: `7`,
    id: `seven`
  },
  {
    value: `8`,
    id: `eight`
  },
  {
    value: `9`,
    id: `nine`
  },
  {
    value: `0`,
    id: `zero`
  },
  { value: `.`, id: `decimal` },
  { value: `+`, id: `add` },
  { value: `-`, id: `subtract` },
  { value: `x`, id: `multiply` },
  { value: `/`, id: `divide` },
  { value: `AC`, id: `clear` },
  { value: `=`, id: `equals` }
];

const isOperationSign = el => {
  if (el === `+` || el === `-` || el === `x` || el === `/` || el === `*`)
    return true;
};

const App = () => {
  const [display, setDisplay] = useState(`0`);
  const [isDisplayFloat, changeDisplayToFloat] = useState(false);
  const digitLimitMet = () => {
    setDisplay(`Digit Limit Met`);
    setTimeout(function() {
      setDisplay(`0`);
      changeDisplayToFloat(false);
    }, 500);
  };
  const handleClick = e => {
    const clickedButton = e.target.innerHTML;
    const lastCharacterOfDisplay = display.toString().slice(-1);
    if (clickedButton !== `AC`) {
      if (display === `0`) {
        if (
          clickedButton === `=` ||
          clickedButton === `0` ||
          clickedButton === `x` ||
          clickedButton === `/`
        ) {
          setDisplay(`0`);
        } else if (clickedButton === `.`) {
          setDisplay(display + clickedButton);
          changeDisplayToFloat(true);
        } else {
          setDisplay(clickedButton);
        }
      } else if (display === `+` || display === `-`) {
        if (clickedButton === `+` || clickedButton === `-`) {
          setDisplay(clickedButton);
        } else if (clickedButton === `.`) {
          setDisplay(display + `0` + clickedButton);
          changeDisplayToFloat(true);
        } else if (
          clickedButton === `x` ||
          clickedButton === `/` ||
          clickedButton === `=`
        ) {
          setDisplay(display);
        } else {
          setDisplay(display + clickedButton);
        }
      } else {
        if (clickedButton === `=`) {
          let result = 0;
          if (isOperationSign(lastCharacterOfDisplay)) {
            result = eval(display.substring(0, display.length - 1));
            if (result.toString().length > 20) {
              digitLimitMet();
            } else {
              setDisplay(result.toString());
              changeDisplayToFloat(result % 1);
            }
          } else {
            result = eval(display);
            if (result.toString().length > 20) {
              digitLimitMet();
            } else {
              setDisplay(result.toString());
              changeDisplayToFloat(result % 1);
            }
          }
        } else if (isOperationSign(clickedButton)) {
          if (display.length > 19) {
            digitLimitMet();
          } else {
            if (isOperationSign(lastCharacterOfDisplay)) {
              if (clickedButton === `x`) {
                setDisplay(display.substring(0, display.length - 1) + `*`);
              } else {
                setDisplay(
                  display.substring(0, display.length - 1) + clickedButton
                );
              }
            } else {
              if (clickedButton === `x`) {
                setDisplay(display + `*`);
              } else {
                setDisplay(display + clickedButton);
              }
            }
            changeDisplayToFloat(false);
          }
        } else if (clickedButton === `.`) {
          if (display.length > 19) {
            digitLimitMet();
          } else {
            if (isOperationSign(lastCharacterOfDisplay)) {
              setDisplay(display + `0` + clickedButton);
              changeDisplayToFloat(true);
            } else {
              if (!isDisplayFloat) {
                setDisplay(display + clickedButton);
                changeDisplayToFloat(true);
              } else {
                setDisplay(display);
              }
            }
          }
        } else {
          if (display === `0`) {
            setDisplay(clickedButton);
          } else {
            if ((display + clickedButton).length > 20) {
              digitLimitMet();
            } else {
              setDisplay(display + clickedButton);
            }
          }
        }
      }
    } else {
      setDisplay(`0`);
      if (isDisplayFloat) {
        changeDisplayToFloat(false);
      }
    }
  };
  return (
    <div id='container'>
      <p id='display'>{display}</p>
      {buttons.map(e => (
        <NumberPad key={e.id} value={e.value} id={e.id} onClick={handleClick} />
      ))}
    </div>
  );
};

export default App;
