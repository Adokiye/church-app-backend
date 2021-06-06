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
        action: _joi["default"].string().required(),
        first_name: _joi["default"].string().required(),
        last_name: _joi["default"].string().required(),
        other_name: _joi["default"].string(),
        dob: _joi["default"].date(),
        user_gender: _joi["default"].string().valid('male', 'female'),
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit').required(),
        address: _joi["default"].string().required(),
        profile_url: _joi["default"].string(),
        marital_status: _joi["default"].string().required(),
        employment_status: _joi["default"].string().required(),
        educational_background: _joi["default"].string().required(),
        baptismal_status: _joi["default"].string().required(),
        role: _joi["default"].string().required()
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
  update: function update() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        first_name: _joi["default"].string(),
        last_name: _joi["default"].string(),
        other_name: _joi["default"].string(),
        dob: _joi["default"].date(),
        user_gender: _joi["default"].string().valid('male', 'female'),
        email: _joi["default"].string().email(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'),
        address: _joi["default"].string(),
        profile_url: _joi["default"].string(),
        marital_status: _joi["default"].string(),
        employment_status: _joi["default"].string(),
        educational_background: _joi["default"].string(),
        baptismal_status: _joi["default"].string(),
        role: _joi["default"].string()
      }
    });
  },
  updateDeviceToken: function updateDeviceToken() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        device_token: _joi["default"].string().required(),
        device_name: _joi["default"].string().required(),
        device_type: _joi["default"].string().required()
      }
    });
  },
  checkForUsername: function checkForUsername() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        username: _joi["default"].string().required()
      }
    });
  }
};
var _default = UserValidator;
exports["default"] = _default;
//# sourceMappingURL=user-validator.js.map