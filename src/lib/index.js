// @flow
import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import "./style.css";

// Doesn't really check if it's a style Object
// Basic implemenetation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
export const isStyleObject = obj => typeof obj === "object";

const OtpInput = ({
  OTPLength,
  disabled,
  autoFocus,
  value = "",
  onChange,
  otpType,
  secure
}) => {
  const [activeInput, setActiveInput] = useState(0);

  const getOtpValue = () => (value ? value.toString().split("") : []);

  // Helper to return OTP from input
  const handleOtpChange = otp => {
    let otpValue = otp.join("");
    if (otpType === "number") {
      otpValue = +otpValue;
    }
    onChange(otpValue);
  };

  // Focus on input by index
  const focusInput = input => {
    const nextActiveInput = Math.max(Math.min(OTPLength - 1, input), 0);
    setActiveInput(nextActiveInput);
  };

  /**
   * @typedef {"next" | "prev"} FocusDirections
   * @param {FocusDirections} direction
   */
  const focusInputByDirection = (direction = "next") => {
    focusInput(direction === "next" ? activeInput + 1 : activeInput - 1);
  };

  // Change OTP value at focused input
  const changeActiveInputValue = ([nextValue]) => {
    const otp = getOtpValue();
    otp[activeInput] = nextValue;
    handleOtpChange(otp);
  };

  // Handle pasted OTP
  const handleOnPaste = e => {
    e.preventDefault();
    const otp = getOtpValue();

    // Get pastedData in an array of max size (num of inputs - current position)
    const clipboardData = e.clipboardData
      .getData("text/plain")
      .slice(0, OTPLength - activeInput)
      .split("");

    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (let pos = 0; pos < OTPLength; ++pos) {
      if (pos >= activeInput && clipboardData.length > 0) {
        otp[pos] = clipboardData.shift();
      }
    }

    handleOtpChange(otp);
  };

  const handleOnChange = e => {
    if (otpType === "number" && Number.isNaN(Number(e.target.value))) {
      // preventing number other then number inputs
      return;
    }
    changeActiveInputValue(e.target.value);
    focusInputByDirection("next");
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  const handleOnKeyDown = e => {
    switch (e.key) {
      case "Backspace":
        e.preventDefault();
        changeActiveInputValue("");
        focusInputByDirection("prev");
        break;
      case "Delete":
        e.preventDefault();
        changeActiveInputValue("");
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusInputByDirection("prev");
        break;
      case "ArrowRight":
        e.preventDefault();
        focusInputByDirection("next");
        break;
      default:
        break;
    }
  };

  const handelOnInput = e => {
    if (e.target.value.length > 1) {
      e.preventDefault();
      focusInputByDirection("next");
    }
  };

  const onInputFocus = (index, event) => {
    setActiveInput(index);
    event.target.select();
  };

  const renderInputs = () => {
    const otp = getOtpValue();
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < OTPLength; index++) {
      inputs.push(
        <Input
          key={index}
          focus={activeInput === index}
          value={otp[index]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handelOnInput}
          onPaste={handleOnPaste}
          onInputFocus={onInputFocus}
          index={index}
          // onBlur={() => setActiveInput(-1)}
          disabled={disabled}
          autoFocus={autoFocus}
          secure={secure}
        />
      );
    }

    return inputs;
  };

  return <div className="otp__input-root">{renderInputs()}</div>;
};

OtpInput.propTypes = {
  OTPLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  secure: PropTypes.bool,
  otpType: PropTypes.oneOf(["number", "any"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

OtpInput.defaultProps = {
  OTPLength: 4,
  onChange: () => {},
  disabled: false,
  secure: false,
  autoFocus: true,
  value: "",
  otpType: "any"
};

export default OtpInput;
