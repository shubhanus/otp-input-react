"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var inputDefaultStyles = {
  width: 32,
  height: 32,
  textAlign: "center",
  marginRight: 20
};

/**
 * This is react stateless component
 * Renders an input box
 * @param {Object} {
 *   focus,
 *   autoFocus,
 *   disabled,
 *   value,
 *   secure,
 *   ...rest
 * }
 * @returns
 */
var Input = function Input(_ref) {
  var focus = _ref.focus,
      autoFocus = _ref.autoFocus,
      disabled = _ref.disabled,
      value = _ref.value,
      onInputFocus = _ref.onInputFocus,
      index = _ref.index,
      secure = _ref.secure,
      inputStyles = _ref.inputStyles,
      rest = _objectWithoutProperties(_ref, ["focus", "autoFocus", "disabled", "value", "onInputFocus", "index", "secure", "inputStyles"]);

  var input = (0, _react.useRef)(null);
  var componentMounted = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    // When component mounts
    if (autoFocus && focus) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  (0, _react.useEffect)(function () {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  var handelInputFocus = function handelInputFocus(event) {
    return onInputFocus(index, event);
  };

  return _react2.default.createElement("input", _extends({
    style: _extends({}, inputDefaultStyles, inputStyles),
    type: secure ? "password" : "tel",
    maxLength: "1",
    ref: input,
    disabled: disabled,
    onFocus: handelInputFocus,
    value: value || ""
  }, rest));
};

Input.propTypes = {
  focus: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  numInputs: _propTypes2.default.number,
  index: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  secure: _propTypes2.default.bool,
  inputStyles: _propTypes2.default.object
};

exports.default = _react2.default.memo(Input);