"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

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

exports.default = useResendOTP;