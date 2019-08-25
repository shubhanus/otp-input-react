import React from "react";
import PropTypes from "prop-types";
import useResendOTP from "../hooks/resendOTP";

function ResendOTP({ renderTime, renderButton, style, className, ...props }) {
  const { remainingTime, handelResendClick } = useResendOTP(props);
  return (
    <div
      className={className || ""}
      data-testid="otp-resend-root"
      style={{
        display: "flex",
        justifyContent: "space-between",
        ...style
      }}
    >
      {renderTime ? (
        renderTime(remainingTime)
      ) : (
        <span>{remainingTime} sec</span>
      )}
      {renderButton ? (
        renderButton({
          disabled: remainingTime !== 0,
          onClick: handelResendClick,
          remainingTime
        })
      ) : (
        <button disabled={remainingTime !== 0} onClick={handelResendClick}>
          Resend OTP
        </button>
      )}
    </div>
  );
}

ResendOTP.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {}
};

ResendOTP.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ResendOTP;
