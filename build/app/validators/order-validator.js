"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var meal = _joi["default"].object().keys({
  name: _joi["default"].string().required(),
  id: _joi["default"].string().required(),
  quantity: _joi["default"].number().required(),
  addons: _joi["default"].array().items(_joi["default"].object().keys({
    name: _joi["default"].string().required(),
    id: _joi["default"].string().required(),
    quantity: _joi["default"].number().required()
  }))
});

var OrderValidator = {
  calculateOrder: function calculateOrder() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meals: _joi["default"].array().items(meal).required(),
        cokitchen_polygon_id: _joi["default"].string().required(),
        address: _joi["default"].string().required(),
        discount_code: _joi["default"].string()
      }
    });
  },
  updateCalculatedOrder: function updateCalculatedOrder() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meals: _joi["default"].array().items(meal),
        cokitchen_polygon_id: _joi["default"].string(),
        address: _joi["default"].string(),
        discount_code: _joi["default"].string()
      }
    });
  }
};
var _default = OrderValidator;
exports["default"] = _default;
//# sourceMappingURL=order-validator.js.map