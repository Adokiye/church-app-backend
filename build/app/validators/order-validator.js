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
        discount_code: _joi["default"].string(),
        lat: _joi["default"].string().required(),
        lng: _joi["default"].string().required()
      }
    });
  },
  updateCalculatedOrder: function updateCalculatedOrder() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meals: _joi["default"].array().items(meal),
        cokitchen_polygon_id: _joi["default"].string(),
        address: _joi["default"].string(),
        discount_code: _joi["default"].string(),
        lat: _joi["default"].string(),
        lng: _joi["default"].string()
      }
    });
  },
  createOrder: function createOrder() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        calculated_order_id: _joi["default"].string().required(),
        order_type_id: _joi["default"].string().required(),
        use_wallet: _joi["default"].bool(),
        order_details: _joi["default"].object().keys({
          rider_note: _joi["default"].string().required(),
          order_note: _joi["default"].string().required()
        })
      }
    });
  }
};
var _default = OrderValidator;
exports["default"] = _default;
//# sourceMappingURL=order-validator.js.map