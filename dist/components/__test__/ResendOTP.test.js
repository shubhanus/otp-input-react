"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ResendOTP = require("../ResendOTP");

var _ResendOTP2 = _interopRequireDefault(_ResendOTP);

var _react3 = require("@testing-library/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var inputSetup = function inputSetup() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var onTimerComplete = jest.fn(props.onTimerComplete);
  var onResendClick = jest.fn(props.onResendClick);
  var utils = (0, _react3.render)(_react2.default.createElement(_ResendOTP2.default, {
    maxTime: props.maxTime,
    onTimerComplete: onTimerComplete,
    onResendClick: onResendClick,
    timeInterval: props.timeInterval,
    className: props.className,
    style: props.style,
    renderTime: props.renderTime,
    renderButton: props.renderButton
  }));
  var otpResendEl = utils.getByTestId("otp-resend-root");
  return _extends({
    otpResendEl: otpResendEl,
    onTimerComplete: onTimerComplete,
    onResendClick: onResendClick
  }, utils);
};

it("renders without crashing", function () {
  var _inputSetup = inputSetup(),
      otpResendEl = _inputSetup.otpResendEl;

  expect(otpResendEl).toBeInTheDocument();
  expect(otpResendEl).toMatchInlineSnapshot("\n    <div\n      class=\"\"\n      data-testid=\"otp-resend-root\"\n      style=\"display: flex; justify-content: space-between;\"\n    >\n      <span>\n        60\n         sec\n      </span>\n      <button\n        disabled=\"\"\n      >\n        Resend OTP\n      </button>\n    </div>\n  ");
});

it("Starts timer from maxTime prop", function () {
  var _inputSetup2 = inputSetup({ maxTime: 10 }),
      otpResendEl = _inputSetup2.otpResendEl;

  var span = otpResendEl.querySelector("span");
  expect(span.innerHTML).toBe("10 sec");
});

// jest.useFakeTimers();

it("Triggers onTimerComplete after given time", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _inputSetup3, onTimerComplete;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          jest.useFakeTimers();
          _inputSetup3 = inputSetup({ maxTime: 1 }), onTimerComplete = _inputSetup3.onTimerComplete;

          jest.runAllTimers();
          _context.next = 5;
          return (0, _react3.wait)(function () {
            expect(onTimerComplete).toHaveBeenCalledTimes(1);
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it("Gives callback on onResendClick", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var _inputSetup4, onResendClick, otpResendEl;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          jest.useFakeTimers();
          _inputSetup4 = inputSetup({ maxTimer: 1 }), onResendClick = _inputSetup4.onResendClick, otpResendEl = _inputSetup4.otpResendEl;

          jest.runAllTimers();
          _context3.next = 5;
          return (0, _react3.wait)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var button;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _react3.waitForElement)(function () {
                      return otpResendEl.querySelector("button");
                    });

                  case 2:
                    button = _context2.sent;

                    _react3.fireEvent.click(button);
                    expect(onResendClick).toHaveBeenCalledTimes(1);

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          })));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

it("Won't trigger onResendClick when timer is not finished", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
  var _inputSetup5, onResendClick, otpResendEl, button;

  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _inputSetup5 = inputSetup({ maxTime: 60 }), onResendClick = _inputSetup5.onResendClick, otpResendEl = _inputSetup5.otpResendEl;
          button = otpResendEl.querySelector("button");

          _react3.fireEvent.click(button);
          _context4.next = 5;
          return (0, _react3.wait)(function () {
            expect(onResendClick).toHaveBeenCalledTimes(0);
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

it("Renders className as test", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var _inputSetup6, otpResendEl;

  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _inputSetup6 = inputSetup({ className: "test" }), otpResendEl = _inputSetup6.otpResendEl;

          expect(otpResendEl).toHaveAttribute("class", "test");

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

it("Changes root style from style props", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
  var _inputSetup7, otpResendEl;

  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _inputSetup7 = inputSetup({ style: { display: "block" } }), otpResendEl = _inputSetup7.otpResendEl;

          expect(otpResendEl.style.display).toBe("block");

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
})));

it("Render props works for timer component", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
  var renderTime, _inputSetup8, otpResendEl, timeComp;

  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          renderTime = function renderTime(remainingTime) {
            return _react2.default.createElement(
              "span",
              null,
              remainingTime,
              " s"
            );
          };

          _inputSetup8 = inputSetup({ renderTime: renderTime }), otpResendEl = _inputSetup8.otpResendEl;
          _context7.next = 4;
          return (0, _react3.waitForElement)(function () {
            return otpResendEl.querySelector("span");
          });

        case 4:
          timeComp = _context7.sent;

          expect(timeComp.innerHTML).toBe("60 s");

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, undefined);
})));

describe("Render props for button element", function () {
  jest.useFakeTimers();
  var renderButton = function renderButton() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var renderButton = function renderButton(props) {
      return _react2.default.createElement(
        "button",
        props,
        "Resend"
      );
    };

    var _inputSetup9 = inputSetup(_extends({
      renderButton: renderButton
    }, props)),
        otpResendEl = _inputSetup9.otpResendEl,
        onResendClick = _inputSetup9.onResendClick;

    return { otpResendEl: otpResendEl, onResendClick: onResendClick };
  };

  it("Renders disabled button", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _react3.wait)(function () {
              var _renderButton = renderButton(),
                  otpResendEl = _renderButton.otpResendEl;

              var button = otpResendEl.querySelector("button");
              expect(button).toBeDisabled();
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  it("Enables button after completing maxTimer", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _renderButton2, otpResendEl, button;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _renderButton2 = renderButton({ maxTimer: 2 }), otpResendEl = _renderButton2.otpResendEl;

            jest.runAllTimers();
            button = otpResendEl.querySelector("button");
            _context9.next = 5;
            return (0, _react3.wait)(function () {
              expect(button).not.toBeDisabled();
            });

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  it("Gives callback onResendClick only after timer completes", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var _renderButton3, otpResendEl, onResendClick, button;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _renderButton3 = renderButton({ maxTimer: 2 }), otpResendEl = _renderButton3.otpResendEl, onResendClick = _renderButton3.onResendClick;
            button = otpResendEl.querySelector("button");

            _react3.fireEvent.click(button);
            jest.runAllTimers();
            _react3.fireEvent.click(button);
            _context10.next = 7;
            return (0, _react3.wait)(function () {
              expect(onResendClick).toHaveBeenCalledTimes(1);
            });

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));
});