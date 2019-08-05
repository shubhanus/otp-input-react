// @flow
import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

// Doesn't really check if it's a style Object
// Basic implemenetation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
export const isStyleObject = obj => typeof obj === "object";

const OtpInput = ({
  numInputs,
  inputStyle,
  focusStyle,
  separator,
  isDisabled,
  disabledStyle,
  hasErrored,
  errorStyle,
  shouldAutoFocus,
  value = "",
  onChange,
  isInputNum,
  containerStyle
}) => {
  const [activeInput, setActiveInput] = useState(0);

  const getOtpValue = () => (value ? value.toString().split("") : []);

  // Helper to return OTP from input
  const handleOtpChange = otp => {
    const otpValue = otp.join("");
    onChange(isInputNum ? Number(otpValue) : otpValue);
  };

  // Focus on input by index
  const focusInput = input => {
    const nextActiveInput = Math.max(Math.min(numInputs - 1, input), 0);
    setActiveInput(nextActiveInput);
  };

  // Focus on next input
  const focusNextInput = () => {
    focusInput(activeInput + 1);
  };

  // Focus on previous input
  const focusPrevInput = () => {
    focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  const changeCodeAtFocus = ([nextValue]) => {
    const otp = getOtpValue();
    otp[activeInput] = nextValue;
    handleOtpChange(otp);
  };

  // Handle pasted OTP
  const handleOnPaste = e => {
    e.preventDefault();
    const otp = getOtpValue();

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, numInputs - activeInput)
      .split("");

    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
      }
    }

    handleOtpChange(otp);
  };

  const handleOnChange = e => {
    if (isInputNum && Number.isNaN(Number(e.target.value))) {
      // preventing number other then number inputs
      return;
    }
    changeCodeAtFocus(e.target.value);
    focusNextInput();
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  const handleOnKeyDown = e => {
    if (e.keyCode === BACKSPACE || e.key === "Backspace") {
      e.preventDefault();
      changeCodeAtFocus("");
      focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === "Delete") {
      e.preventDefault();
      changeCodeAtFocus("");
    } else if (e.keyCode === LEFT_ARROW || e.key === "ArrowLeft") {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === "ArrowRight") {
      e.preventDefault();
      focusNextInput();
    }
  };

  const checkLength = e => {
    if (e.target.value.length > 1) {
      e.preventDefault();
      focusNextInput();
    }
  };

  const renderInputs = () => {
    const otp = getOtpValue();
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <Input
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={checkLength}
          onPaste={handleOnPaste}
          onFocus={e => {
            setActiveInput(i);
            e.target.select();
          }}
          onBlur={() => setActiveInput(-1)}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={false}
        />
      );
    }

    return inputs;
  };

  return (
    <div
      style={Object.assign(
        { display: "flex" },
        isStyleObject(containerStyle) && containerStyle
      )}
      className={!isStyleObject(containerStyle) && containerStyle}
    >
      {renderInputs()}
    </div>
  );
};

OtpInput.propTypes = {
  numInputs: PropTypes.number,
  onChange: PropTypes.func,
  separator: PropTypes.object,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  isDisabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  hasErrored: PropTypes.bool,
  errorStyle: PropTypes.object,
  shouldAutoFocus: PropTypes.bool,
  isInputNum: PropTypes.bool,
  value: PropTypes.string
};

OtpInput.defaultProps = {
  numInputs: 4,
  onChange: () => {},
  isDisabled: false,
  shouldAutoFocus: false,
  value: ""
};

export default OtpInput;
