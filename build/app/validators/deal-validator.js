"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var image = _joi["default"].string();

var brand = _joi["default"].object().keys();

var DealsValidator = {
  createDeal: function createDeal() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        deal_type_id: _joi["default"].string().required(),
        deal_value_type_id: _joi["default"].string().required(),
        deal_requirement_type_id: _joi["default"].string().required(),
        deal_eligibility_type_id: _joi["default"].string().required(),
        cokitchen_id: _joi["default"].string(),
        brands: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        title: _joi["default"].string().required(),
        heading: _joi["default"].string().required(),
        discount_code: _joi["default"].string().required(),
        body: _joi["default"].string().required(),
        images: _joi["default"].array().items(image).required(),
        specific_customers: _joi["default"].array().items(image),
        fixed_amount: _joi["default"].string(),
        rate: _joi["default"].number().required(),
        min_amount: _joi["default"].string(),
        max_amount: _joi["default"].string(),
        min_items: _joi["default"].string(),
        max_items: _joi["default"].string(),
        to_expire_date: _joi["default"].date().required(),
        to_expire_time: _joi["default"].string().required(),
        to_start_date: _joi["default"].date().required(),
        to_start_time: _joi["default"].string().required(),
        post: _joi["default"].bool()
      }
    });
  },
  updateDeal: function updateDeal() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        deal_type_id: _joi["default"].string(),
        deal_value_type_id: _joi["default"].string(),
        deal_requirement_type_id: _joi["default"].string(),
        deal_eligibility_type_id: _joi["default"].string(),
        brands: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        title: _joi["default"].string(),
        heading: _joi["default"].string(),
        discount_code: _joi["default"].string(),
        body: _joi["default"].string(),
        images: _joi["default"].array().items(image),
        rate: _joi["default"].number(),
        min_amount: _joi["default"].string(),
        max_amount: _joi["default"].string(),
        min_items: _joi["default"].string(),
        max_items: _joi["default"].string(),
        to_expire_date: _joi["default"].date(),
        to_expire_time: _joi["default"].string(),
        to_start_date: _joi["default"].date(),
        to_start_time: _joi["default"].string(),
        specific_customers: _joi["default"].array().items(image),
        fixed_amount: _joi["default"].string()
      }
    });
  }
};
var _default = DealsValidator;
exports["default"] = _default;
//# sourceMappingURL=deal-validator.js.map