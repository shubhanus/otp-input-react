"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ResendOTP = require("./components/ResendOTP");

Object.defineProperty(exports, "ResendOTP", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ResendOTP).default;
  }
});

var _OTPReader = require("./components/OTPReader");

Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_OTPReader).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }