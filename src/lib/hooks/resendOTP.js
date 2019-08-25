import { useState, useEffect, useRef } from "react";

const useResendOTP = ({
  maxTime,
  onTimerComplete,
  timeInterval,
  onResendClick
}) => {
  const timeout = useRef();

  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    if (timeout.current && remainingTime === 0) {
      clearTimeout(timeout.current);
      if (onTimerComplete) {
        onTimerComplete();
      }
    } else {
      timeout.current = setTimeout(() => {
        setRemainingTime(t => t - 1);
      }, timeInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [onTimerComplete, remainingTime, timeInterval]);

  const handelResendClick = () => {
    if (onResendClick) {
      onResendClick(remainingTime === 0);
    }
    setRemainingTime(maxTime);
  };

  return {
    handelResendClick,
    remainingTime
  };
};

export default useResendOTP;
