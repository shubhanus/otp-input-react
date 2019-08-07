import React from "react";
import Input from "../Input";
import { render, fireEvent, wait } from "@testing-library/react";

const inputSetup = props => {
  const onChange = jest.fn();
  const { container, getByTestId } = render(
    <Input
      index={0}
      value="0"
      {...props}
      data-testid="otp-input"
      onChange={onChange}
    />
  );
  const inputEle = getByTestId("otp-input");
  return {
    onChange,
    container,
    inputEle
  };
};

test("renders input with inital value", () => {
  const { inputEle, container } = inputSetup();
  expect(inputEle).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
    <input
      data-testid="otp-input"
      maxlength="1"
      style="width: 32px; height: 32px; text-align: center; margin-right: 20px;"
      type="tel"
      value="0"
    />
  `);
  expect(inputEle.value).toBe("0");
});

test("renders secure input", () => {
  const { inputEle } = inputSetup({ secure: true });
  expect(inputEle).toHaveAttribute("type");
  expect(inputEle).toHaveAttribute("type", "password");
});

test("autofocus input on render", () => {
  const onInputFocus = jest.fn();
  const { inputEle, onChange } = inputSetup({
    onInputFocus,
    autoFocus: true,
    focus: true
  });
  expect(document.activeElement).toEqual(inputEle);
  expect(onInputFocus).toBeCalledTimes(1);
  expect(onChange).toBeCalledTimes(0);
});

test("calls on change method on value change", async () => {
  const { inputEle, onChange } = inputSetup();
  fireEvent.change(inputEle, { target: { value: "1" } });
  await wait(() => {
    expect(onChange).toBeCalledTimes(1);
  });
});
