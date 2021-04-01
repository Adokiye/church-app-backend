"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var image = _joi["default"].string();

var DealsValidator = {
  createDeal: function createDeal() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        deal_type_id: _joi["default"].string().required(),
        brands: _joi["default"].array().items(_joi["default"].string()),
        name: _joi["default"].string().required(),
        description: _joi["default"].string().required(),
        images: _joi["default"].array().items(image).required(),
        rate: _joi["default"].number().required()
      }
    });
  },
  updateDeal: function updateDeal() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        deal_type_id: _joi["default"].string(),
        brands: _joi["default"].array().items(_joi["default"].string()),
        name: _joi["default"].string(),
        description: _joi["default"].string(),
        images: _joi["default"].array().items(image),
        rate: _joi["default"].number()
      }
    });
  }
};
var _default = DealsValidator;
exports["default"] = _default;
//# sourceMappingURL=deal-validator.js.map