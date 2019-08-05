"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStyleObject = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// keyCode constants
var BACKSPACE = 8;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var DELETE = 46;

// Doesn't really check if it's a style Object
// Basic implemenetation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
var isStyleObject = exports.isStyleObject = function isStyleObject(obj) {
  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object";
};

var OtpInput = function OtpInput(_ref) {
  var numInputs = _ref.numInputs,
      inputStyle = _ref.inputStyle,
      focusStyle = _ref.focusStyle,
      separator = _ref.separator,
      isDisabled = _ref.isDisabled,
      disabledStyle = _ref.disabledStyle,
      hasErrored = _ref.hasErrored,
      errorStyle = _ref.errorStyle,
      shouldAutoFocus = _ref.shouldAutoFocus,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? "" : _ref$value,
      onChange = _ref.onChange,
      isInputNum = _ref.isInputNum,
      containerStyle = _ref.containerStyle;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeInput = _useState2[0],
      setActiveInput = _useState2[1];

  var getOtpValue = function getOtpValue() {
    return value ? value.toString().split("") : [];
  };

  // Helper to return OTP from input
  var handleOtpChange = function handleOtpChange(otp) {
    var otpValue = otp.join("");
    onChange(isInputNum ? Number(otpValue) : otpValue);
  };

  // Focus on input by index
  var focusInput = function focusInput(input) {
    var nextActiveInput = Math.max(Math.min(numInputs - 1, input), 0);
    setActiveInput(nextActiveInput);
  };

  // Focus on next input
  var focusNextInput = function focusNextInput() {
    focusInput(activeInput + 1);
  };

  // Focus on previous input
  var focusPrevInput = function focusPrevInput() {
    focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  var changeCodeAtFocus = function changeCodeAtFocus(_ref2) {
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
    var pastedData = e.clipboardData.getData("text/plain").slice(0, numInputs - activeInput).split("");

    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (var pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
      }
    }

    handleOtpChange(otp);
  };

  var handleOnChange = function handleOnChange(e) {
    if (isInputNum && Number.isNaN(Number(e.target.value))) {
      // preventing number other then number inputs
      return;
    }
    changeCodeAtFocus(e.target.value);
    focusNextInput();
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  var handleOnKeyDown = function handleOnKeyDown(e) {
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

  var checkLength = function checkLength(e) {
    if (e.target.value.length > 1) {
      e.preventDefault();
      focusNextInput();
    }
  };

  var renderInputs = function renderInputs() {
    var otp = getOtpValue();
    var inputs = [];

    // eslint-disable-next-line no-plusplus

    var _loop = function _loop(i) {
      inputs.push(_react2.default.createElement(_Input2.default, {
        key: i,
        focus: activeInput === i,
        value: otp && otp[i],
        onChange: handleOnChange,
        onKeyDown: handleOnKeyDown,
        onInput: checkLength,
        onPaste: handleOnPaste,
        onFocus: function onFocus(e) {
          setActiveInput(i);
          e.target.select();
        },
        onBlur: function onBlur() {
          return setActiveInput(-1);
        },
        separator: separator,
        inputStyle: inputStyle,
        focusStyle: focusStyle,
        isLastChild: i === numInputs - 1,
        isDisabled: isDisabled,
        disabledStyle: disabledStyle,
        hasErrored: hasErrored,
        errorStyle: errorStyle,
        shouldAutoFocus: shouldAutoFocus,
        isInputNum: false
      }));
    };

    for (var i = 0; i < numInputs; i++) {
      _loop(i);
    }

    return inputs;
  };

  return _react2.default.createElement(
    "div",
    {
      style: Object.assign({ display: "flex" }, isStyleObject(containerStyle) && containerStyle),
      className: !isStyleObject(containerStyle) && containerStyle
    },
    renderInputs()
  );
};

OtpInput.propTypes = {
  numInputs: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  separator: _propTypes2.default.object,
  containerStyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  focusStyle: _propTypes2.default.object,
  isDisabled: _propTypes2.default.bool,
  disabledStyle: _propTypes2.default.object,
  hasErrored: _propTypes2.default.bool,
  errorStyle: _propTypes2.default.object,
  shouldAutoFocus: _propTypes2.default.bool,
  isInputNum: _propTypes2.default.bool,
  value: _propTypes2.default.string
};

OtpInput.defaultProps = {
  numInputs: 4,
  onChange: function onChange() {},
  isDisabled: false,
  shouldAutoFocus: false,
  value: ""
};

exports.default = OtpInput;