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

  const getClasses = (...classes) =>
    classes.filter(c => !isStyleObject(c) && c !== false).join(" ");

  const numValueLimits = isInputNum ? { min: 0, max: 9 } : {};

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        style={Object.assign(
          { width: "1em", textAlign: "center" },
          isStyleObject(inputStyle) && inputStyle,
          focus && isStyleObject(focusStyle) && focusStyle,
          isDisabled && isStyleObject(disabledStyle) && disabledStyle,
          hasErrored && isStyleObject(errorStyle) && errorStyle
        )}
        className={getClasses(
          inputStyle,
          focus && focusStyle,
          isDisabled && disabledStyle,
          hasErrored && errorStyle
        )}
        type={isInputNum ? "number" : "tel"}
        {...numValueLimits}
        maxLength="1"
        ref={input}
        disabled={isDisabled}
        value={value || ""}
        {...rest}
      />
      {!isLastChild && separator}
    </div>
  );
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
