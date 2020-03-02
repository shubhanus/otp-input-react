"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _resendOTP = _interopRequireDefault(require("../hooks/resendOTP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ResendOTP(_ref) {
  var renderTime = _ref.renderTime,
      renderButton = _ref.renderButton,
      style = _ref.style,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["renderTime", "renderButton", "style", "className"]);

  var _useResendOTP = (0, _resendOTP.default)(props),
      remainingTime = _useResendOTP.remainingTime,
      handelResendClick = _useResendOTP.handelResendClick;

  return _react.default.createElement("div", {
    className: className || "",
    "data-testid": "otp-resend-root",
    style: _objectSpread({
      display: "flex",
      justifyContent: "space-between"
    }, style)
  }, renderTime ? renderTime(remainingTime) : _react.default.createElement("span", null, remainingTime, " sec"), renderButton ? renderButton({
    disabled: remainingTime !== 0,
    onClick: handelResendClick,
    remainingTime: remainingTime
  }) : _react.default.createElement("button", {
    disabled: remainingTime !== 0,
    onClick: handelResendClick
  }, "Resend OTP"));
}

ResendOTP.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {}
};
ResendOTP.propTypes = {
  onTimerComplete: _propTypes.default.func,
  onResendClick: _propTypes.default.func,
  renderTime: _propTypes.default.func,
  renderButton: _propTypes.default.func,
  maxTime: _propTypes.default.number,
  timeInterval: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
var _default = ResendOTP;
exports.default = _default;