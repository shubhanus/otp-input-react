"use strict";

var _reactHooks = require("@testing-library/react-hooks");

var _useOTP = require("../useOTP");

var _useOTP2 = _interopRequireDefault(_useOTP);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should have activeInput as -1 without autofocus", function () {
  var onChange = jest.fn();

  var _renderHook = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "any"
    });
  }),
      result = _renderHook.result;

  expect(result.current.activeInput).toBe(-1);
});

it("should have activeInput as 0 with autofocus", function () {
  var onChange = jest.fn();

  var _renderHook2 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "any",
      autoFocus: true
    });
  }),
      result = _renderHook2.result;

  expect(result.current.activeInput).toBe(0);
});

it('getOtpValue should return array with length 4 for initial value "1234"', function () {
  var onChange = jest.fn();

  var _renderHook3 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "any",
      autoFocus: true,
      value: "1234"
    });
  }),
      result = _renderHook3.result;

  var value = void 0;
  (0, _reactHooks.act)(function () {
    value = result.current.getOtpValue();
  });
  expect(value).toEqual(["1", "2", "3", "4"]);
  expect(value).toHaveLength(4);
});

it("handleOnChange should not change active input when otpType=number and value is string", function () {
  var onChange = jest.fn();

  var _renderHook4 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "number",
      autoFocus: true,
      value: ""
    });
  }),
      result = _renderHook4.result;

  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "s" } });
  });
  expect(onChange).toHaveBeenCalledTimes(0);
  expect(result.current.activeInput).toBe(0);
});

it("handleOnChange should change active input when otpType=number \n    and value is number and change focus, \n    also call on change function that return string type value", function () {
  var value = "";
  var onChange = jest.fn(function (e) {
    value = e;
  });

  var _renderHook5 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "number",
      autoFocus: true,
      value: value
    });
  }),
      result = _renderHook5.result,
      rerender = _renderHook5.rerender;

  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "0" } });
    rerender();
  });
  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "2" } });
    rerender();
  });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveReturnedTimes(2);
  expect(result.current.activeInput).toBe(2);
  expect(value).toBe("02");
});

it("handleOnChange should change active input when otpType=any \n    and change focus, also call on change function that return string type value", function () {
  var value = "";
  var onChange = jest.fn(function (e) {
    value = e;
  });

  var _renderHook6 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "any",
      autoFocus: true,
      value: value
    });
  }),
      result = _renderHook6.result,
      rerender = _renderHook6.rerender;

  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "1" } });
    rerender();
  });
  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "2" } });
    rerender();
  });
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveReturnedTimes(2);
  expect(result.current.activeInput).toBe(2);
  expect(value).toBe("12");
});

it("handleOnKeyDown based on e.key it should remove value and change focus", function () {
  var value = "";
  var onChange = jest.fn(function (e) {
    value = e;
  });

  var _renderHook7 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      onChange: onChange,
      otpType: "any",
      autoFocus: true,
      value: value
    });
  }),
      result = _renderHook7.result,
      rerender = _renderHook7.rerender;

  (0, _reactHooks.act)(function () {
    result.current.handleOnKeyDown({
      key: "ArrowRight",
      preventDefault: function preventDefault() {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(1);

  (0, _reactHooks.act)(function () {
    result.current.handleOnKeyDown({
      key: "ArrowLeft",
      preventDefault: function preventDefault() {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);

  (0, _reactHooks.act)(function () {
    result.current.handleOnChange({ target: { value: "1" } });
    rerender();
  });

  (0, _reactHooks.act)(function () {
    result.current.handleOnKeyDown({
      key: "Backspace",
      preventDefault: function preventDefault() {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);
  expect(value).toBe("1");

  (0, _reactHooks.act)(function () {
    result.current.handleOnKeyDown({
      key: "Delete",
      preventDefault: function preventDefault() {}
    });
    rerender();
  });
  expect(result.current.activeInput).toBe(0);
  expect(value).toBe("");
});

it("handelOnInput should change focus to next input", function () {
  var _renderHook8 = (0, _reactHooks.renderHook)(function () {
    return (0, _useOTP2.default)({
      OTPLength: 4,
      otpType: "any",
      autoFocus: true
    });
  }),
      result = _renderHook8.result,
      rerender = _renderHook8.rerender;

  (0, _reactHooks.act)(function () {
    result.current.handelOnInput({
      target: { value: "12" },
      preventDefault: function preventDefault() {}
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