"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var _useOTP2 = _interopRequireDefault(require("../hooks/useOTP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OtpInput = function OtpInput(_ref) {
  var OTPLength = _ref.OTPLength,
      disabled = _ref.disabled,
      autoFocus = _ref.autoFocus,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? "" : _ref$value,
      onChange = _ref.onChange,
      otpType = _ref.otpType,
      secure = _ref.secure,
      className = _ref.className,
      inputClassName = _ref.inputClassName,
      inputStyles = _ref.inputStyles,
      style = _ref.style;

  var _useOTP = (0, _useOTP2.default)({
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
      onInputFocus = _useOTP.onInputFocus; // Needs to be memorized


  var renderInputs = (0, _react.useMemo)(function () {
    var otp = getOtpValue();
    var inputs = []; // eslint-disable-next-line no-plusplus

    for (var index = 0; index < OTPLength; index++) {
      inputs.push(_react.default.createElement(_Input.default, {
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
        index: index // onBlur={() => setActiveInput(-1)}
        ,
        disabled: disabled,
        autoFocus: autoFocus,
        secure: secure,
        "data-testid": "input"
      }));
    }

    return inputs;
  }, [getOtpValue, OTPLength, inputClassName, inputStyles, activeInput, handleOnChange, handleOnKeyDown, handelOnInput, handleOnPaste, onInputFocus, disabled, autoFocus, secure]);
  return _react.default.createElement("div", {
    style: _objectSpread({
      display: "flex"
    }, style),
    className: "".concat(className),
    "data-testid": "otp-input-root"
  }, renderInputs);
};

OtpInput.propTypes = {
  className: _propTypes.default.string,
  inputClassName: _propTypes.default.string,
  OTPLength: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  secure: _propTypes.default.bool,
  otpType: _propTypes.default.oneOf(["number", "alpha", "alphanumeric", "any"]),
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  inputStyles: _propTypes.default.object,
  style: _propTypes.default.object
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
var _default = OtpInput;
exports.default = _default;