import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
const Input = ({
  focus,
  autoFocus,
  disabled,
  value,
  onInputFocus,
  index,
  secure,
  ...rest
}) => {
  const input = useRef(null);

  useEffect(() => {
    // Focus on first render
    // Only when autoFocus is true
    // Prevent calling function if input already in focus
    if (autoFocus && input && focus) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  const handelInputFocus = event => onInputFocus(index, event);

  return (
    <input
      type={secure ? "password" : "tel"}
      maxLength="1"
      ref={input}
      disabled={disabled}
      onFocus={handelInputFocus}
      value={value || ""}
      {...rest}
    />
  );
};

Input.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  numInputs: PropTypes.number,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  secure: PropTypes.bool
};

export default React.memo(Input);
