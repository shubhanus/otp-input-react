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
  const componentMounted = useRef(false);
  useEffect(() => {
    // When component mounts
    if (autoFocus && focus) {
      input.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When component focus updates
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
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
