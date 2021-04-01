"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var UserValidator = {
  send_otp: function send_otp() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        phone_number: _joi["default"].string().min(11).max(11).required(),
        action: _joi["default"].string().required()
      }
    });
  },
  create: function create() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        phone_number: _joi["default"].string().min(11).max(11).required(),
        otp: _joi["default"].string().required(),
        action: _joi["default"].string().required()
      }
    });
  },
  login: function login() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().min(1).required()
      }
    });
  },
  verifyUser: function verifyUser() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        user_id: _joi["default"].string().required(),
        phone_number: _joi["default"].string().min(11).max(11).required(),
        otp: _joi["default"].string().required()
      }
    });
  },
  createMarketingStaff: function createMarketingStaff() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        first_name: _joi["default"].string().required(),
        last_name: _joi["default"].string().required(),
        other_name: _joi["default"].string(),
        dob: _joi["default"].string(),
        gender: _joi["default"].string().valid('male', 'female'),
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit').required(),
        phone_number: _joi["default"].string().min(11).max(11).required()
      }
    });
  },
  registerStaff: function registerStaff() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        first_name: _joi["default"].string().required(),
        last_name: _joi["default"].string().required(),
        other_name: _joi["default"].string(),
        dob: _joi["default"].string(),
        gender: _joi["default"].string().valid('male', 'female'),
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit').required(),
        phone_number: _joi["default"].string().min(11).max(11).required()
      }
    });
  },
  update: function update() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        first_name: _joi["default"].string(),
        last_name: _joi["default"].string(),
        other_name: _joi["default"].string(),
        dob: _joi["default"].date(),
        gender: _joi["default"].string().valid('male', 'female'),
        email: _joi["default"].string().email(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit')
      }
    });
  }
};
var _default = UserValidator;
exports["default"] = _default;
//# sourceMappingURL=user-validator.js.map