"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Input = function Input(_ref) {
  var focus = _ref.focus,
      shouldAutoFocus = _ref.shouldAutoFocus,
      separator = _ref.separator,
      isLastChild = _ref.isLastChild,
      inputStyle = _ref.inputStyle,
      isDisabled = _ref.isDisabled,
      hasErrored = _ref.hasErrored,
      errorStyle = _ref.errorStyle,
      focusStyle = _ref.focusStyle,
      disabledStyle = _ref.disabledStyle,
      isInputNum = _ref.isInputNum,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["focus", "shouldAutoFocus", "separator", "isLastChild", "inputStyle", "isDisabled", "hasErrored", "errorStyle", "focusStyle", "disabledStyle", "isInputNum", "value"]);

  var input = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    // Focus on first render
    // Only when shouldAutoFocus is true
    // Prevent calling function if input already in focus
    if (shouldAutoFocus && input && focus) {
      input.current.focus();
    }
  }, [focus]);

  var getClasses = function getClasses() {
    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }

    return classes.filter(function (c) {
      return !(0, _.isStyleObject)(c) && c !== false;
    }).join(" ");
  };

  var numValueLimits = isInputNum ? { min: 0, max: 9 } : {};

  return _react2.default.createElement(
    "div",
    { style: { display: "flex", alignItems: "center" } },
    _react2.default.createElement("input", _extends({
      style: Object.assign({ width: "1em", textAlign: "center" }, (0, _.isStyleObject)(inputStyle) && inputStyle, focus && (0, _.isStyleObject)(focusStyle) && focusStyle, isDisabled && (0, _.isStyleObject)(disabledStyle) && disabledStyle, hasErrored && (0, _.isStyleObject)(errorStyle) && errorStyle),
      className: getClasses(inputStyle, focus && focusStyle, isDisabled && disabledStyle, hasErrored && errorStyle),
      type: isInputNum ? "number" : "tel"
    }, numValueLimits, {
      maxLength: "1",
      ref: input,
      disabled: isDisabled,
      value: value || ""
    }, rest)),
    !isLastChild && separator
  );
};

Input.propTypes = {
  focus: _propTypes2.default.bool,
  shouldAutoFocus: _propTypes2.default.bool,
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
  isInputNum: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  isLastChild: _propTypes2.default.bool
};

exports.default = _react2.default.memo(Input);