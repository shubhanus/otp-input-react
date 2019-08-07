"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OtpInput = function OtpInput(_ref) {
  var OTPLength = _ref.OTPLength,
      disabled = _ref.disabled,
      autoFocus = _ref.autoFocus,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? "" : _ref$value,
      onChange = _ref.onChange,
      otpType = _ref.otpType,
      secure = _ref.secure,
      className = _ref.className,
      inputClassName = _ref.inputClassName,
      inputStyles = _ref.inputStyles,
      style = _ref.style;

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
    if (otpType === "number") {
      otpValue = +otpValue;
    }
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
  var handleOnPaste = function handleOnPaste(e) {
    e.preventDefault();
    var otp = getOtpValue();

    // Get pastedData in an array of max size (num of inputs - current position)
    var clipboardData = e.clipboardData.getData("text/plain").slice(0, OTPLength - activeInput).split("");

    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (var pos = 0; pos < OTPLength; ++pos) {
      if (pos >= activeInput && clipboardData.length > 0) {
        otp[pos] = clipboardData.shift();
      }
    }

    handleOtpChange(otp);
  };

  var handleOnChange = function handleOnChange(e) {
    if (otpType === "number" && Number.isNaN(Number(e.target.value))) {
      // preventing number other then number inputs
      return;
    }
    changeActiveInputValue(e.target.value);
    focusInputByDirection("next");
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

  // Needs to be memorized
  var renderInputs = function renderInputs() {
    var otp = getOtpValue();
    var inputs = [];

    // eslint-disable-next-line no-plusplus
    for (var index = 0; index < OTPLength; index++) {
      inputs.push(_react2.default.createElement(_Input2.default, {
        className: inputClassName,
        inputStyles: inputStyles,
        key: index,
        focus: activeInput === index,
        value: otp[index],
        onChange: handleOnChange,
        onKeyDown: handleOnKeyDown,
        onInput: handelOnInput,
        onPaste: handleOnPaste,
        onInputFocus: onInputFocus,
        index: index
        // onBlur={() => setActiveInput(-1)}
        , disabled: disabled,
        autoFocus: autoFocus,
        secure: secure,
        "data-testid": "input"
      }));
    }

    return inputs;
  };

  return _react2.default.createElement(
    "div",
    {
      style: _extends({ display: "flex" }, style),
      className: "" + className,
      "data-testid": "otp-input-root"
    },
    renderInputs()
  );
};

OtpInput.propTypes = {
  className: _propTypes2.default.string,
  inputClassName: _propTypes2.default.string,
  OTPLength: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  secure: _propTypes2.default.bool,
  otpType: _propTypes2.default.oneOf(["number", "any"]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  inputStyles: _propTypes2.default.object,
  style: _propTypes2.default.object
};

OtpInput.defaultProps = {
  className: "",
  inputClassName: "",
  OTPLength: 4,
  onChange: function onChange() {},
  disabled: false,
  secure: false,
  autoFocus: false,
  value: "",
  otpType: "any",
  inputStyles: {},
  style: {}
};

exports.default = OtpInput;