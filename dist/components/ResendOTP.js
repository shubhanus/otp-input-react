"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resendOTP = require("../hooks/resendOTP");

var _resendOTP2 = _interopRequireDefault(_resendOTP);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ResendOTP(_ref) {
  var renderTime = _ref.renderTime,
      renderButton = _ref.renderButton,
      style = _ref.style,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["renderTime", "renderButton", "style", "className"]);

  var _useResendOTP = (0, _resendOTP2.default)(props),
      remainingTime = _useResendOTP.remainingTime,
      handelResendClick = _useResendOTP.handelResendClick;

  return _react2.default.createElement(
    "div",
    {
      className: className || "",
      "data-testid": "otp-resend-root",
      style: _extends({
        display: "flex",
        justifyContent: "space-between"
      }, style)
    },
    renderTime ? renderTime(remainingTime) : _react2.default.createElement(
      "span",
      null,
      remainingTime,
      " sec"
    ),
    renderButton ? renderButton({
      disabled: remainingTime !== 0,
      onClick: handelResendClick,
      remainingTime: remainingTime
    }) : _react2.default.createElement(
      "button",
      { disabled: remainingTime !== 0, onClick: handelResendClick },
      "Resend OTP"
    )
  );
}

ResendOTP.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {}
};

ResendOTP.propTypes = {
  onTimerComplete: _propTypes2.default.func,
  onResendClick: _propTypes2.default.func,
  renderTime: _propTypes2.default.func,
  renderButton: _propTypes2.default.func,
  maxTime: _propTypes2.default.number,
  timeInterval: _propTypes2.default.number,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};

exports.default = ResendOTP;