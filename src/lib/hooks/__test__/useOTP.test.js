import { renderHook, act } from "@testing-library/react-hooks";
import useOTP from "../useOTP";

it("should have activeInput as -1 without autofocus", () => {
  const onChange = jest.fn();
  const { result } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "any"
    })
  );
  expect(result.current.activeInput).toBe(-1);
});

it("should have activeInput as 0 with autofocus", () => {
  const onChange = jest.fn();
  const { result } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "any",
      autoFocus: true
    })
  );
  expect(result.current.activeInput).toBe(0);
});

it('getOtpValue should return array with length 4 for initial value "1234"', () => {
  const onChange = jest.fn();
  const { result } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "any",
      autoFocus: true,
      value: "1234"
    })
  );
  let value;
  act(() => {
    value = result.current.getOtpValue();
  });
  expect(value).toEqual(["1", "2", "3", "4"]);
  expect(value).toHaveLength(4);
});

it("handleOnChange should not change active input when otpType=number and value is string", () => {
  const onChange = jest.fn();
  const { result } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "number",
      autoFocus: true,
      value: ""
    })
  );
  act(() => {
    result.current.handleOnChange({ target: { value: "s" } });
  });
  expect(onChange).toHaveBeenCalledTimes(0);
  expect(result.current.activeInput).toBe(0);
});

it(`handleOnChange should change active input when otpType=number 
    and value is number and change focus, 
    also call on change function that return string type value`, () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const { result, rerender } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "number",
      autoFocus: true,
      value
    })
  );
  act(() => {
    result.current.handleOnChange({ target: { value: "0" } });
    rerender();
  });
  act(() => {
    result.current.handleOnChange({ target: { value: "2" } });
    rerender();
  });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveReturnedTimes(2);
  expect(result.current.activeInput).toBe(2);
  expect(value).toBe("02");
});

it(`handleOnChange should change active input when otpType=any 
    and change focus, also call on change function that return string type value`, () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const { result, rerender } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "any",
      autoFocus: true,
      value
    })
  );
  act(() => {
    result.current.handleOnChange({ target: { value: "1" } });
    rerender();
  });
  act(() => {
    result.current.handleOnChange({ target: { value: "2" } });
    rerender();
  });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveReturnedTimes(2);
  expect(result.current.activeInput).toBe(2);
  expect(value).toBe("12");
});

it(`handleOnKeyDown based on e.key it should remove value and change focus`, () => {
  let value = "";
  const onChange = jest.fn(e => {
    value = e;
  });
  const { result, rerender } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      onChange,
      otpType: "any",
      autoFocus: true,
      value
    })
  );
  act(() => {
    result.current.handleOnKeyDown({
      key: "ArrowRight",
      preventDefault: () => {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(1);

  act(() => {
    result.current.handleOnKeyDown({
      key: "ArrowLeft",
      preventDefault: () => {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);

  act(() => {
    result.current.handleOnChange({ target: { value: "1" } });
    rerender();
  });

  act(() => {
    result.current.handleOnKeyDown({
      key: "Backspace",
      preventDefault: () => {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);
  expect(value).toBe("1");

  act(() => {
    result.current.handleOnKeyDown({
      key: "Delete",
      preventDefault: () => {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);
  expect(value).toBe("");
});

it("handelOnInput should change focus to next input", () => {
  const { result, rerender } = renderHook(() =>
    useOTP({
      OTPLength: 4,
      otpType: "any",
      autoFocus: true
    })
  );
  act(() => {
    result.current.handelOnInput({
      target: { value: "12" },
      preventDefault: () => {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(1);
});

// fit("handleOnPaste should change focus to next input", () => {
//   const { result, rerender } = renderHook(() =>
//     useOTP({
//       OTPLength: 4,
//       otpType: "any",
//       autoFocus: true
//     })
//   );
//   act(() => {
//     result.current.handelOnInput({
//       target: { value: "12" },
//       preventDefault: () => {}
//     });
//     rerender();
//   });
//   expect(result.current.activeInput).toBe(1);
// });

// it("focus input should change activeInput state bw length", () => {
//   const onChange = jest.fn();
//   const { result } = renderHook(() =>
//     useOTP({
//       OTPLength: 4,
//       onChange,
//       otpType: "any",
//       autoFocus: true,
//       value: "1234"
//     })
//   );
//   act(() => {
//     result.current.focusInput(2);
//   });
//   expect(result.current.activeInput).toBe(2);
// });
