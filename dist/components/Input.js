"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react.useEffect)(function () {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus();
    }

    componentMounted.current = true; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  var handelInputFocus = function handelInputFocus(event) {
    return onInputFocus(index, event);
  };

  return _react.default.createElement("input", _extends({
    style: _objectSpread({}, inputDefaultStyles, {}, inputStyles),
    type: secure ? "password" : "tel",
    maxLength: "1",
    ref: input,
    disabled: disabled,
    onFocus: handelInputFocus,
    value: value || ""
  }, rest));
};

Input.propTypes = {
  focus: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  numInputs: _propTypes.default.number,
  index: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.string,
  secure: _propTypes.default.bool,
  inputStyles: _propTypes.default.object
};

var _default = _react.default.memo(Input);

exports.default = _default;