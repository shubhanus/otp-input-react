"use strict";

var _react = _interopRequireDefault(require("react"));

var _OTPReader = _interopRequireDefault(require("../OTPReader"));

var _react2 = require("@testing-library/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var inputSetup = function inputSetup() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = jest.fn(props.onChangeCB);
  var utils = (0, _react2.render)(_react.default.createElement(_OTPReader.default, _extends({
    onChange: onChange
  }, props)));
  var otpInputEl = utils.getByTestId("otp-input-root");
  return _objectSpread({
    otpInputEl: otpInputEl,
    onChange: onChange
  }, utils);
};

test("renders without crashing", function () {
  var _inputSetup = inputSetup(),
      otpInputEl = _inputSetup.otpInputEl; //   console.log(otpInputEl);


  expect(otpInputEl).toBeInTheDocument();
  expect(otpInputEl).toMatchInlineSnapshot("\n    <div\n      class=\"\"\n      data-testid=\"otp-input-root\"\n      style=\"display: flex;\"\n    >\n      <input\n        class=\"\"\n        data-testid=\"input\"\n        maxlength=\"1\"\n        style=\"width: 32px; height: 32px; text-align: center; margin-right: 20px;\"\n        type=\"tel\"\n        value=\"\"\n      />\n      <input\n        class=\"\"\n        data-testid=\"input\"\n        maxlength=\"1\"\n        style=\"width: 32px; height: 32px; text-align: center; margin-right: 20px;\"\n        type=\"tel\"\n        value=\"\"\n      />\n      <input\n        class=\"\"\n        data-testid=\"input\"\n        maxlength=\"1\"\n        style=\"width: 32px; height: 32px; text-align: center; margin-right: 20px;\"\n        type=\"tel\"\n        value=\"\"\n      />\n      <input\n        class=\"\"\n        data-testid=\"input\"\n        maxlength=\"1\"\n        style=\"width: 32px; height: 32px; text-align: center; margin-right: 20px;\"\n        type=\"tel\"\n        value=\"\"\n      />\n    </div>\n  ");
});
test("should have 4 inputs by default",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _inputSetup2, getAllByTestId, allInpEl;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _inputSetup2 = inputSetup(), getAllByTestId = _inputSetup2.getAllByTestId;
          allInpEl = getAllByTestId("input");
          expect(allInpEl).toHaveLength(4);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test("should have 6 input when OTPLength = 6",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var OTPLength, _inputSetup3, getAllByTestId, allInpEl;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          OTPLength = 6;
          _inputSetup3 = inputSetup({
            OTPLength: OTPLength
          }), getAllByTestId = _inputSetup3.getAllByTestId;
          allInpEl = getAllByTestId("input");
          expect(allInpEl).toHaveLength(OTPLength);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test("should call onChange function and value",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var value, onChange, props, _inputSetup4, rerender, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          value = "";
          onChange = jest.fn(function (e) {
            value = e;
          });
          props = {
            onChange: onChange,
            value: value,
            autoFocus: true
          };
          _inputSetup4 = inputSetup(props), rerender = _inputSetup4.rerender, getAllByTestId = _inputSetup4.getAllByTestId;
          allInp = getAllByTestId("input");

          _react2.fireEvent.change(allInp[0], {
            target: {
              value: "1"
            }
          });

          _context3.next = 8;
          return rerender(_react.default.createElement(_OTPReader.default, _extends({}, props, {
            value: value
          })));

        case 8:
          expect(onChange).toBeCalledTimes(1);
          expect(allInp[0].value).toBe("1");
          expect(document.activeElement).toBe(allInp[1]);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test("should change focus to next element",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var value, onChange, props, _inputSetup5, rerender, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          value = "";
          onChange = jest.fn(function (e) {
            value = e;
          });
          props = {
            onChange: onChange,
            value: value,
            autoFocus: true
          };
          _inputSetup5 = inputSetup(props), rerender = _inputSetup5.rerender, getAllByTestId = _inputSetup5.getAllByTestId;
          allInp = getAllByTestId("input");

          _react2.fireEvent.change(allInp[0], {
            target: {
              value: "1"
            }
          });

          _context4.next = 8;
          return rerender(_react.default.createElement(_OTPReader.default, _extends({}, props, {
            value: value
          })));

        case 8:
          expect(document.activeElement).toBe(allInp[1]);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test("should disable inputs and wont focus",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var props, _inputSetup6, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          props = {
            autoFocus: true,
            disabled: true
          };
          _inputSetup6 = inputSetup(props), getAllByTestId = _inputSetup6.getAllByTestId;
          allInp = getAllByTestId("input");
          allInp.forEach(function (inp) {
            expect(inp).toHaveAttribute("disabled");
          });
          expect(document.activeElement).not.toBe(allInp[0]);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test("should prevent non-numeric when otpType is number ",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var value, onChange, props, _inputSetup7, rerender, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          value = "";
          onChange = jest.fn(function (e) {
            value = e;
          });
          props = {
            onChange: onChange,
            value: value,
            autoFocus: true,
            otpType: "number"
          };
          _inputSetup7 = inputSetup(props), rerender = _inputSetup7.rerender, getAllByTestId = _inputSetup7.getAllByTestId;
          allInp = getAllByTestId("input");

          _react2.fireEvent.change(allInp[0], {
            target: {
              value: "a"
            }
          });

          _context6.next = 8;
          return rerender(_react.default.createElement(_OTPReader.default, _extends({}, props, {
            value: value
          })));

        case 8:
          expect(allInp[0].value).toBe("");
          expect(onChange).toBeCalledTimes(0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test("should prevent numbers when otpType is alpha ",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var value, onChange, props, _inputSetup8, rerender, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          value = "";
          onChange = jest.fn(function (e) {
            value = e;
          });
          props = {
            onChange: onChange,
            value: value,
            autoFocus: true,
            otpType: "alpha"
          };
          _inputSetup8 = inputSetup(props), rerender = _inputSetup8.rerender, getAllByTestId = _inputSetup8.getAllByTestId;
          allInp = getAllByTestId("input");

          _react2.fireEvent.change(allInp[0], {
            target: {
              value: "3"
            }
          });

          _context7.next = 8;
          return rerender(_react.default.createElement(_OTPReader.default, _extends({}, props, {
            value: value
          })));

        case 8:
          expect(allInp[0].value).toBe("");
          expect(onChange).toBeCalledTimes(0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));
test("should prevent non-alpha when otpType is alphanumeric",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var value, onChange, props, _inputSetup9, rerender, getAllByTestId, allInp;

  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          value = "";
          onChange = jest.fn(function (e) {
            value = e;
          });
          props = {
            onChange: onChange,
            value: value,
            autoFocus: true,
            otpType: "alpha"
          };
          _inputSetup9 = inputSetup(props), rerender = _inputSetup9.rerender, getAllByTestId = _inputSetup9.getAllByTestId;
          allInp = getAllByTestId("input");

          _react2.fireEvent.change(allInp[0], {
            target: {
              value: "#"
            }
          });

          _context8.next = 8;
          return rerender(_react.default.createElement(_OTPReader.default, _extends({}, props, {
            value: value
          })));

        case 8:
          expect(allInp[0].value).toBe("");
          expect(onChange).toBeCalledTimes(0);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));