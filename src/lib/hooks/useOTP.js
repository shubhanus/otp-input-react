import { useState } from "react";

const useOTP = ({ autoFocus, value, otpType, onChange, OTPLength }) => {
  const [activeInput, setActiveInput] = useState(autoFocus ? 0 : -1);

  const getOtpValue = () => (value ? value.toString().split("") : []);

  // Helper to return OTP from input
  const handleOtpChange = otp => {
    let otpValue = otp.join("");
    // if (otpType === "number") {
    //   otpValue = +otpValue;
    // }
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
  const handleOnPaste = (e, data) => {
    e.preventDefault();
    const otp = getOtpValue();

    // Get pastedData in an array of max size (num of inputs - current position)
    const clipboardData =
      process.env.NODE_ENV === "test"
        ? data.slice(0, OTPLength - activeInput).split("")
        : e.clipboardData
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

  return {
    activeInput,
    getOtpValue,
    handleOnChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus
  };
};

export default useOTP;
