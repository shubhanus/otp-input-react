import React from "react";
import OTPInput from "../OTPReader";
import { render, fireEvent } from "@testing-library/react";

const inputSetup = (props = {}) => {
  const onChange = jest.fn(props.onChangeCB);
  const utils = render(<OTPInput onChange={onChange} {...props} />);
  const otpInputEl = utils.getByTestId("otp-input-root");
  return {
    otpInputEl,
    onChange,
    ...utils
  };
};

test("renders without crashing", () => {
  const { otpInputEl } = inputSetup();
  //   console.log(otpInputEl);
  expect(otpInputEl).toBeInTheDocument();
  expect(otpInputEl).toMatchInlineSnapshot(`
    <div
      class=""
      data-testid="otp-input-root"
      style="display: flex;"
    >
      <input
        class=""
        data-testid="input"
        maxlength="1"
        style="width: 32px; height: 32px; text-align: center; margin-right: 20px;"
        type="tel"
        value=""
      />
      <input
        class=""
        data-testid="input"
        maxlength="1"
        style="width: 32px; height: 32px; text-align: center; margin-right: 20px;"
        type="tel"
        value=""
      />
      <input
        class=""
        data-testid="input"
        maxlength="1"
        style="width: 32px; height: 32px; text-align: center; margin-right: 20px;"
        type="tel"
        value=""
      />
      <input
        class=""
        data-testid="input"
        maxlength="1"
        style="width: 32px; height: 32px; text-align: center; margin-right: 20px;"
        type="tel"
        value=""
      />
    </div>
  `);
});

test("should have 4 inputs by default", async () => {
  const { getAllByTestId } = inputSetup();
  const allInpEl = getAllByTestId("input");
  expect(allInpEl).toHaveLength(4);
});

test("should have 6 input when OTPLength = 6", async () => {
  const OTPLength = 6;
  const { getAllByTestId } = inputSetup({ OTPLength });
  const allInpEl = getAllByTestId("input");
  expect(allInpEl).toHaveLength(OTPLength);
});

test("should call onChange function and value", async () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const props = {
    onChange,
    value,
    autoFocus: true
  };
  const { rerender, getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  fireEvent.change(allInp[0], { target: { value: "1" } });
  await rerender(<OTPInput {...props} value={value} />);
  expect(onChange).toBeCalledTimes(1);
  expect(allInp[0].value).toBe("1");
  expect(document.activeElement).toBe(allInp[1]);
});

test("should change focus to next element", async () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const props = {
    onChange,
    value,
    autoFocus: true
  };
  const { rerender, getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  fireEvent.change(allInp[0], { target: { value: "1" } });
  await rerender(<OTPInput {...props} value={value} />);
  expect(document.activeElement).toBe(allInp[1]);
});

test("should disable inputs and wont focus", async () => {
  const props = {
    autoFocus: true,
    disabled: true
  };
  const { getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  allInp.forEach(inp => {
    expect(inp).toHaveAttribute("disabled");
  });
  expect(document.activeElement).not.toBe(allInp[0]);
});

test("should prevent non-numeric when otpType is number ", async () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const props = {
    onChange,
    value,
    autoFocus: true,
    otpType: "number"
  };
  const { rerender, getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  fireEvent.change(allInp[0], { target: { value: "a" } });
  await rerender(<OTPInput {...props} value={value} />);
  expect(allInp[0].value).toBe("");
  expect(onChange).toBeCalledTimes(0);
});

test("should prevent numbers when otpType is alpha ", async () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const props = {
    onChange,
    value,
    autoFocus: true,
    otpType: "alpha"
  };
  const { rerender, getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  fireEvent.change(allInp[0], { target: { value: "3" } });
  await rerender(<OTPInput {...props} value={value} />);
  expect(allInp[0].value).toBe("");
  expect(onChange).toBeCalledTimes(0);
});

test("should prevent non-alpha when otpType is alphanumeric", async () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const props = {
    onChange,
    value,
    autoFocus: true,
    otpType: "alpha"
  };
  const { rerender, getAllByTestId } = inputSetup(props);
  const allInp = getAllByTestId("input");
  fireEvent.change(allInp[0], { target: { value: "#" } });
  await rerender(<OTPInput {...props} value={value} />);
  expect(allInp[0].value).toBe("");
  expect(onChange).toBeCalledTimes(0);
});

