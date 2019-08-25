import React from "react";
import ResendOTP from "../ResendOTP";
import {
  render,
  fireEvent,
  wait,
  waitForElement
} from "@testing-library/react";

const inputSetup = (props = {}) => {
  const onTimerComplete = jest.fn(props.onTimerComplete);
  const onResendClick = jest.fn(props.onResendClick);
  const utils = render(
    <ResendOTP
      maxTime={props.maxTime}
      onTimerComplete={onTimerComplete}
      onResendClick={onResendClick}
      timeInterval={props.timeInterval}
      className={props.className}
      style={props.style}
      renderTime={props.renderTime}
      renderButton={props.renderButton}
    />
  );
  const otpResendEl = utils.getByTestId("otp-resend-root");
  return {
    otpResendEl,
    onTimerComplete,
    onResendClick,
    ...utils
  };
};

it("renders without crashing", () => {
  const { otpResendEl } = inputSetup();
  expect(otpResendEl).toBeInTheDocument();
  expect(otpResendEl).toMatchInlineSnapshot(`
    <div
      class=""
      data-testid="otp-resend-root"
      style="display: flex; justify-content: space-between;"
    >
      <span>
        60
         sec
      </span>
      <button
        disabled=""
      >
        Resend OTP
      </button>
    </div>
  `);
});

it("Starts timer from maxTime prop", () => {
  const { otpResendEl } = inputSetup({ maxTime: 10 });
  const span = otpResendEl.querySelector("span");
  expect(span.innerHTML).toBe("10 sec");
});

// jest.useFakeTimers();

it("Triggers onTimerComplete after given time", async () => {
  jest.useFakeTimers();
  const { onTimerComplete } = inputSetup({ maxTime: 1 });
  jest.runAllTimers();
  await wait(() => {
    expect(onTimerComplete).toHaveBeenCalledTimes(1);
  });
});

it("Gives callback on onResendClick", async () => {
  jest.useFakeTimers();
  const { onResendClick, otpResendEl } = inputSetup({ maxTimer: 1 });
  jest.runAllTimers();
  await wait(async () => {
    const button = await waitForElement(() =>
      otpResendEl.querySelector("button")
    );
    fireEvent.click(button);
    expect(onResendClick).toHaveBeenCalledTimes(1);
  });
});

it("Won't trigger onResendClick when timer is not finished", async () => {
  const { onResendClick, otpResendEl } = inputSetup({ maxTime: 60 });
  const button = otpResendEl.querySelector("button");
  fireEvent.click(button);
  await wait(() => {
    expect(onResendClick).toHaveBeenCalledTimes(0);
  });
});

it("Renders className as test", async () => {
  const { otpResendEl } = inputSetup({ className: "test" });
  expect(otpResendEl).toHaveAttribute("class", "test");
});

it("Changes root style from style props", async () => {
  const { otpResendEl } = inputSetup({ style: { display: "block" } });
  expect(otpResendEl.style.display).toBe("block");
});

it("Render props works for timer component", async () => {
  const renderTime = remainingTime => <span>{remainingTime} s</span>;
  const { otpResendEl } = inputSetup({ renderTime });
  const timeComp = await waitForElement(() =>
    otpResendEl.querySelector("span")
  );
  expect(timeComp.innerHTML).toBe("60 s");
});

describe("Render props for button element", () => {
  jest.useFakeTimers();
  const renderButton = (props = {}) => {
    const renderButton = props => <button {...props}>Resend</button>;
    const { otpResendEl, onResendClick } = inputSetup({
      renderButton,
      ...props
    });
    return { otpResendEl, onResendClick };
  };

  it("Renders disabled button", async () => {
    await wait(() => {
      const { otpResendEl } = renderButton();
      const button = otpResendEl.querySelector("button");
      expect(button).toBeDisabled();
    });
  });

  it("Enables button after completing maxTimer", async () => {
    const { otpResendEl } = renderButton({ maxTimer: 2 });
    jest.runAllTimers();
    const button = otpResendEl.querySelector("button");
    await wait(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it("Gives callback onResendClick only after timer completes", async () => {
    const { otpResendEl, onResendClick } = renderButton({ maxTimer: 2 });
    const button = otpResendEl.querySelector("button");
    fireEvent.click(button);
    jest.runAllTimers();
    fireEvent.click(button);
    await wait(() => {
      expect(onResendClick).toHaveBeenCalledTimes(1);
    });
  });
});
