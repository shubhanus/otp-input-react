"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactHooks = require("@testing-library/react-hooks");

var _resendOTP = require("../resendOTP");

var _resendOTP2 = _interopRequireDefault(_resendOTP);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var renderHookGetUtils = function renderHookGetUtils() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$maxTime = _ref.maxTime,
      maxTime = _ref$maxTime === undefined ? 60 : _ref$maxTime,
      _ref$timeInterval = _ref.timeInterval,
      timeInterval = _ref$timeInterval === undefined ? 1000 : _ref$timeInterval;

  var onTimerComplete = jest.fn();
  var onResendClick = jest.fn();
  var utils = (0, _reactHooks.renderHook)(function () {
    return (0, _resendOTP2.default)({
      maxTime: maxTime,
      onTimerComplete: onTimerComplete,
      timeInterval: timeInterval,
      onResendClick: onResendClick
    });
  });
  return _extends({
    onTimerComplete: onTimerComplete,
    onResendClick: onResendClick
  }, utils);
};

it("Starts with maxTime prop", function () {
  var maxTime = 50;

  var _renderHookGetUtils = renderHookGetUtils({ maxTime: maxTime }),
      result = _renderHookGetUtils.result;

  expect(result.current.remainingTime).toBe(maxTime);
});

it("Change remaining time with interval", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var maxTime, _renderHookGetUtils2, result, waitForNextUpdate;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          maxTime = 50;
          _renderHookGetUtils2 = renderHookGetUtils({ maxTime: maxTime }), result = _renderHookGetUtils2.result, waitForNextUpdate = _renderHookGetUtils2.waitForNextUpdate;
          _context.next = 4;
          return waitForNextUpdate();

        case 4:
          _context.next = 6;
          return waitForNextUpdate();

        case 6:
          expect(result.current.remainingTime).toBe(maxTime - 2);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it("Called onTimerComplete after timer completes", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var maxTime, _renderHookGetUtils3, result, onTimerComplete, waitForNextUpdate;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          maxTime = 2;
          _renderHookGetUtils3 = renderHookGetUtils({
            maxTime: maxTime
          }), result = _renderHookGetUtils3.result, onTimerComplete = _renderHookGetUtils3.onTimerComplete, waitForNextUpdate = _renderHookGetUtils3.waitForNextUpdate;
          _context2.next = 4;
          return waitForNextUpdate();

        case 4:
          _context2.next = 6;
          return waitForNextUpdate();

        case 6:
          expect(result.current.remainingTime).toBe(0);
          expect(onTimerComplete).toBeCalledTimes(1);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

it("Reset timer when handelResendClick get trigger and gives cb to onResendClick", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var maxTime, _renderHookGetUtils4, result, onResendClick, waitForNextUpdate;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          maxTime = 2;
          _renderHookGetUtils4 = renderHookGetUtils({
            maxTime: maxTime
          }), result = _renderHookGetUtils4.result, onResendClick = _renderHookGetUtils4.onResendClick, waitForNextUpdate = _renderHookGetUtils4.waitForNextUpdate;
          _context3.next = 4;
          return waitForNextUpdate();

        case 4:
          _context3.next = 6;
          return waitForNextUpdate();

        case 6:
          (0, _reactHooks.act)(function () {
            result.current.handelResendClick();
          });
          expect(result.current.remainingTime).toBe(maxTime);
          expect(onResendClick).toBeCalledTimes(1);
          expect(onResendClick).toHaveBeenCalledWith(true);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));