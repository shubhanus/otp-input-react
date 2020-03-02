"use strict";

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("../Input"));

var _react2 = require("@testing-library/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var inputSetup = function inputSetup(props) {
  var onChange = jest.fn();

  var _render = (0, _react2.render)(_react.default.createElement(_Input.default, _extends({
    index: 0,
    value: "0"
  }, props, {
    "data-testid": "otp-input",
    onChange: onChange
  }))),
      container = _render.container,
      getByTestId = _render.getByTestId;

  var inputEle = getByTestId("otp-input");
  return {
    onChange: onChange,
    container: container,
    inputEle: inputEle
  };
};

test("renders input with inital value", function () {
  var _inputSetup = inputSetup(),
      inputEle = _inputSetup.inputEle,
      container = _inputSetup.container;

  expect(inputEle).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot("\n    <input\n      data-testid=\"otp-input\"\n      maxlength=\"1\"\n      style=\"width: 32px; height: 32px; text-align: center; margin-right: 20px;\"\n      type=\"tel\"\n      value=\"0\"\n    />\n  ");
  expect(inputEle.value).toBe("0");
});
test("renders secure input", function () {
  var _inputSetup2 = inputSetup({
    secure: true
  }),
      inputEle = _inputSetup2.inputEle;

  expect(inputEle).toHaveAttribute("type");
  expect(inputEle).toHaveAttribute("type", "password");
});
test("autofocus input on render", function () {
  var onInputFocus = jest.fn();

  var _inputSetup3 = inputSetup({
    onInputFocus: onInputFocus,
    autoFocus: true,
    focus: true
  }),
      inputEle = _inputSetup3.inputEle,
      onChange = _inputSetup3.onChange;

  expect(document.activeElement).toEqual(inputEle);
  expect(onInputFocus).toBeCalledTimes(1);
  expect(onChange).toBeCalledTimes(0);
});
test("calls on change method on value change",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _inputSetup4, inputEle, onChange;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _inputSetup4 = inputSetup(), inputEle = _inputSetup4.inputEle, onChange = _inputSetup4.onChange;

          _react2.fireEvent.change(inputEle, {
            target: {
              value: "1"
            }
          });

          _context.next = 4;
          return (0, _react2.wait)(function () {
            expect(onChange).toBeCalledTimes(1);
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));