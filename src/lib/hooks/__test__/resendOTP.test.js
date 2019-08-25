import { renderHook, act } from "@testing-library/react-hooks";
import resendOTP from "../resendOTP";

const renderHookGetUtils = ({ maxTime = 60, timeInterval = 1000 } = {}) => {
  const onTimerComplete = jest.fn();
  const onResendClick = jest.fn();
  const utils = renderHook(() =>
    resendOTP({
      maxTime,
      onTimerComplete,
      timeInterval,
      onResendClick
    })
  );
  return {
    onTimerComplete,
    onResendClick,
    ...utils
  };
};

it("Starts with maxTime prop", () => {
  const maxTime = 50;
  const { result } = renderHookGetUtils({ maxTime });
  expect(result.current.remainingTime).toBe(maxTime);
});

it("Change remaining time with interval", async () => {
  const maxTime = 50;
  const { result, waitForNextUpdate } = renderHookGetUtils({ maxTime });
  await waitForNextUpdate();
  await waitForNextUpdate();
  expect(result.current.remainingTime).toBe(maxTime - 2);
});

it("Called onTimerComplete after timer completes", async () => {
  const maxTime = 2;
  const { result, onTimerComplete, waitForNextUpdate } = renderHookGetUtils({
    maxTime
  });
  await waitForNextUpdate();
  await waitForNextUpdate();
  expect(result.current.remainingTime).toBe(0);
  expect(onTimerComplete).toBeCalledTimes(1);
});

it("Reset timer when handelResendClick get trigger and gives cb to onResendClick", async () => {
  const maxTime = 2;
  const { result, onResendClick, waitForNextUpdate } = renderHookGetUtils({
    maxTime
  });
  await waitForNextUpdate();
  await waitForNextUpdate();
  act(() => {
    result.current.handelResendClick();
  });
  expect(result.current.remainingTime).toBe(maxTime);
  expect(onResendClick).toBeCalledTimes(1);
  expect(onResendClick).toHaveBeenCalledWith(true);
});
