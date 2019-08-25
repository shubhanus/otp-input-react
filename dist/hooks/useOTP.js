"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

// const LOWER_A_KEYCODE = 97;
var UPPER_A_KEYCODE = 65;
var LOWER_Z_KEYCODE = 122;
// const UPPER_Z_KEYCODE = 90;
var ZERO_KEYCODE = 48;
var NINE_KEYCODE = 57;

var useOTP = function useOTP(_ref) {
  var autoFocus = _ref.autoFocus,
      value = _ref.value,
      otpType = _ref.otpType,
      onChange = _ref.onChange,
      OTPLength = _ref.OTPLength;

  var _useState = (0, _react.useState)(autoFocus ? 0 : -1),
      _useState2 = _slicedToArray(_useState, 2),
      activeInput = _useState2[0],
      setActiveInput = _useState2[1];

  var getOtpValue = function getOtpValue() {
    return value ? value.toString().split("") : [];
  };

  // Helper to return OTP from input
  var handleOtpChange = function handleOtpChange(otp) {
    var otpValue = otp.join("");
    // if (otpType === "number") {
    //   otpValue = +otpValue;
    // }
    onChange(otpValue);
  };

  // Focus on input by index
  var focusInput = function focusInput(input) {
    var nextActiveInput = Math.max(Math.min(OTPLength - 1, input), 0);
    setActiveInput(nextActiveInput);
  };

  /**
   * @typedef {"next" | "prev"} FocusDirections
   * @param {FocusDirections} direction
   */
  var focusInputByDirection = function focusInputByDirection() {
    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "next";

    focusInput(direction === "next" ? activeInput + 1 : activeInput - 1);
  };

  // Change OTP value at focused input
  var changeActiveInputValue = function changeActiveInputValue(_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        nextValue = _ref3[0];

    var otp = getOtpValue();
    otp[activeInput] = nextValue;
    handleOtpChange(otp);
  };

  // Handle pasted OTP
  var handleOnPaste = function handleOnPaste(e, data) {
    e.preventDefault();
    var otp = getOtpValue();

    // Get pastedData in an array of max size (num of inputs - current position)
    var clipboardData = process.env.NODE_ENV === "test" ? data.slice(0, OTPLength - activeInput).split("") : e.clipboardData.getData("text/plain").slice(0, OTPLength - activeInput).split("");

    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (var pos = 0; pos < OTPLength; ++pos) {
      if (pos >= activeInput && clipboardData.length > 0) {
        otp[pos] = clipboardData.shift();
      }
    }

    // Pass copied value through onChange rules
    var filteredOtpValue = [otp.length];
    var validCharIndex = 0;
    for (var charIndex = 0; charIndex < otp.length; ++charIndex) {
      if (isValidateChar(otp[charIndex])) {
        filteredOtpValue[validCharIndex] = otp[charIndex];
        validCharIndex++;
      }
    }

    handleOtpChange(filteredOtpValue);
  };

  var isValidateChar = function isValidateChar(char) {
    switch (otpType) {
      case "number":
        return !(char.charCodeAt(0) > NINE_KEYCODE || char.charCodeAt(0) < ZERO_KEYCODE);
      case "alpha":
        return !(char.charCodeAt(0) > LOWER_Z_KEYCODE || char.charCodeAt(0) < UPPER_A_KEYCODE);
      case "alphanumeric":
        return !(char.charCodeAt(0) > LOWER_Z_KEYCODE || char.charCodeAt(0) < ZERO_KEYCODE);
      default:
        return true;
    }
  };

  var handleOnChange = function handleOnChange(e) {
    if (isValidateChar(e.target.value)) {
      changeActiveInputValue(e.target.value);
      focusInputByDirection("next");
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  var handleOnKeyDown = function handleOnKeyDown(e) {
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

  var handelOnInput = function handelOnInput(e) {
    if (e.target.value.length > 1) {
      e.preventDefault();
      focusInputByDirection("next");
    }
  };

  var onInputFocus = function onInputFocus(index, event) {
    setActiveInput(index);
    event.target.select();
  };

  return {
    activeInput: activeInput,
    getOtpValue: getOtpValue,
    handleOnChange: handleOnChange,
    handleOnKeyDown: handleOnKeyDown,
    handelOnInput: handelOnInput,
    handleOnPaste: handleOnPaste,
    onInputFocus: onInputFocus
  };
};

exports.default = useOTP;