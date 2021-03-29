"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var LogisticsValidator = {
  createLogisticsCompany: function createLogisticsCompany() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        contact_phone_number: _joi["default"].string().min(11).max(11).required(),
        name: _joi["default"].string().required(),
        address: _joi["default"].string().required(),
        contact_email: _joi["default"].string().email()
      }
    });
  },
  createLogisticsStaff: function createLogisticsStaff() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        username: _joi["default"].string().required(),
        first_name: _joi["default"].string().required(),
        last_name: _joi["default"].string().required(),
        other_name: _joi["default"].string(),
        email: _joi["default"].string().email(),
        password: _joi["default"].string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).message('Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'),
        logistics_company_id: _joi["default"].string().required()
      }
    });
  }
};
var _default = LogisticsValidator;
exports["default"] = _default;
//# sourceMappingURL=logistics-validator.js.map