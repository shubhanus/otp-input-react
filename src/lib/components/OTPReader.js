// @flow
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import useOTP from "../hooks/useOTP";

const OtpInput = ({
  OTPLength,
  disabled,
  autoFocus,
  value = "",
  onChange,
  otpType,
  secure,
  className,
  inputClassName,
  inputStyles,
  style,
  placeholder,
}) => {
  const {
    activeInput,
    getOtpValue,
    handleOnChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus,
  } = useOTP({
    autoFocus,
    value,
    otpType,
    onChange,
    OTPLength,
  });

  // Needs to be memorized
  const renderInputs = useMemo(() => {
    const otp = getOtpValue();
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < OTPLength; index++) {
      inputs.push(
        <Input
          className={inputClassName}
          inputStyles={inputStyles}
          key={index}
          focus={activeInput === index}
          value={otp[index]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handelOnInput}
          onPaste={handleOnPaste}
          onInputFocus={onInputFocus}
          index={index}
          // onBlur={() => setActiveInput(-1)}
          disabled={disabled}
          autoFocus={autoFocus}
          secure={secure}
          data-testid="input"
          otpType={otpType}
          placeholder={placeholder && placeholder[index]}
        />
      );
    }

    return inputs;
  }, [
    getOtpValue,
    OTPLength,
    inputClassName,
    inputStyles,
    activeInput,
    handleOnChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus,
    disabled,
    autoFocus,
    secure,
    otpType,
    placeholder,
  ]);

  return (
    <div
      style={{
        display: "flex",
        ...style,
      }}
      className={`${className}`}
      data-testid="otp-input-root"
    >
      {renderInputs}
    </div>
  );
};

OtpInput.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  OTPLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  secure: PropTypes.bool,
  otpType: PropTypes.oneOf(["number", "alpha", "alphanumeric", "any"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputStyles: PropTypes.object,
  style: PropTypes.object,
  placeholder: PropTypes.array,
};

OtpInput.defaultProps = {
  className: "",
  inputClassName: "",
  OTPLength: 4,
  onChange: () => {},
  disabled: false,
  secure: false,
  autoFocus: false,
  value: "",
  otpType: "any",
  inputStyles: {},
  style: {},
  placeholder: undefined,
};

export default OtpInput;
