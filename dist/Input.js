function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { isStyleObject } from ".";

const Input = ({
  focus,
  shouldAutoFocus,
  separator,
  isLastChild,
  inputStyle,
  isDisabled,
  hasErrored,
  errorStyle,
  focusStyle,
  disabledStyle,
  isInputNum,
  value,
  ...rest
}) => {
  const input = useRef(null);
  useEffect(() => {
    // Focus on first render
    // Only when shouldAutoFocus is true
    // Prevent calling function if input already in focus
    if (shouldAutoFocus && input && focus) {
      input.current.focus();
    }
  }, [focus]);

  const getClasses = (...classes) => classes.filter(c => !isStyleObject(c) && c !== false).join(" ");

  const numValueLimits = isInputNum ? {
    min: 0,
    max: 9
  } : {};
  return React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, React.createElement("input", _extends({
    style: Object.assign({
      width: "1em",
      textAlign: "center"
    }, isStyleObject(inputStyle) && inputStyle, focus && isStyleObject(focusStyle) && focusStyle, isDisabled && isStyleObject(disabledStyle) && disabledStyle, hasErrored && isStyleObject(errorStyle) && errorStyle),
    className: getClasses(inputStyle, focus && focusStyle, isDisabled && disabledStyle, hasErrored && errorStyle),
    type: isInputNum ? "number" : "tel"
  }, numValueLimits, {
    maxLength: "1",
    ref: input,
    disabled: isDisabled,
    value: value || ""
  }, rest)), !isLastChild && separator);
};

Input.propTypes = {
  focus: PropTypes.bool,
  shouldAutoFocus: PropTypes.bool,
  numInputs: PropTypes.number,
  onChange: PropTypes.func,
  separator: PropTypes.object,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  isDisabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  hasErrored: PropTypes.bool,
  errorStyle: PropTypes.object,
  isInputNum: PropTypes.bool,
  value: PropTypes.string,
  isLastChild: PropTypes.bool
};
export default React.memo(Input);