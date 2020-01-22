"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useResendOTP = function useResendOTP(_ref) {
  var maxTime = _ref.maxTime,
      onTimerComplete = _ref.onTimerComplete,
      timeInterval = _ref.timeInterval,
      onResendClick = _ref.onResendClick;
  var timeout = (0, _react.useRef)();

  var _useState = (0, _react.useState)(maxTime),
      _useState2 = _slicedToArray(_useState, 2),
      remainingTime = _useState2[0],
      setRemainingTime = _useState2[1];

  (0, _react.useEffect)(function () {
    if (timeout.current && remainingTime === 0) {
      clearTimeout(timeout.current);

      if (onTimerComplete) {
        onTimerComplete();
      }
    } else {
      timeout.current = setTimeout(function () {
        setRemainingTime(function (t) {
          return t - 1;
        });
      }, timeInterval);
    }

    return function () {
      clearTimeout(timeout);
    };
  }, [onTimerComplete, remainingTime, timeInterval]);

  var handelResendClick = function handelResendClick() {
    if (onResendClick) {
      onResendClick(remainingTime === 0);
    }

    setRemainingTime(maxTime);
  };

  return {
    handelResendClick: handelResendClick,
    remainingTime: remainingTime
  };
};

var _default = useResendOTP;
exports.default = _default;