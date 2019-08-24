"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

var _useOTP2 = require("../hooks/useOTP");

var _useOTP3 = _interopRequireDefault(_useOTP2);

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

  var _useOTP = (0, _useOTP3.default)({
    autoFocus: autoFocus,
    value: value,
    otpType: otpType,
    onChange: onChange,
    OTPLength: OTPLength
  }),
      activeInput = _useOTP.activeInput,
      getOtpValue = _useOTP.getOtpValue,
      handleOnChange = _useOTP.handleOnChange,
      handleOnKeyDown = _useOTP.handleOnKeyDown,
      handelOnInput = _useOTP.handelOnInput,
      handleOnPaste = _useOTP.handleOnPaste,
      onInputFocus = _useOTP.onInputFocus;

  // Needs to be memorized


  var renderInputs = (0, _react.useMemo)(function () {
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
  }, [getOtpValue, OTPLength, inputClassName, inputStyles, activeInput, handleOnChange, handleOnKeyDown, handelOnInput, handleOnPaste, onInputFocus, disabled, autoFocus, secure]);

  return _react2.default.createElement(
    "div",
    {
      style: _extends({ display: "flex" }, style),
      className: "" + className,
      "data-testid": "otp-input-root"
    },
    renderInputs
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
  otpType: _propTypes2.default.oneOf(["number", "alpha", "alphanumeric", "any"]),
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