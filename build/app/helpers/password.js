"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateConfirmEmailToken = exports.generateOTPToken = exports.encryptPassword = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _require = require("../config"),
    JWT_SECRET = _require.JWT_SECRET,
    OTP_TOKEN_EXPIRE = _require.OTP_TOKEN_EXPIRE,
    CONFIRM_EMAIL_EXPIRE = _require.CONFIRM_EMAIL_EXPIRE;

var encryptPassword = function encryptPassword(password) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return _bcryptjs["default"].hash(password, length);
};

exports.encryptPassword = encryptPassword;

var generateOTPToken = function generateOTPToken(tokenData) {
  return _jsonwebtoken["default"].sign(tokenData, JWT_SECRET, {
    expiresIn: OTP_TOKEN_EXPIRE || '10m'
  });
};

exports.generateOTPToken = generateOTPToken;

var generateConfirmEmailToken = function generateConfirmEmailToken(tokenData) {
  return _jsonwebtoken["default"].sign(tokenData, JWT_SECRET, {
    expiresIn: CONFIRM_EMAIL_EXPIRE || '1d'
  });
};

exports.generateConfirmEmailToken = generateConfirmEmailToken;
//# sourceMappingURL=password.js.map