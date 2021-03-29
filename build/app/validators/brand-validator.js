"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var BrandValidator = {
  getUserBrands: function getUserBrands() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        lat: _joi["default"].number().required(),
        lng: _joi["default"].number().required()
      }
    });
  }
};
var _default = BrandValidator;
exports["default"] = _default;
//# sourceMappingURL=brand-validator.js.map