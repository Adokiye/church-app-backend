"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var image = _joi["default"].string();

var BrandValidator = {
  createBrand: function createBrand() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        name: _joi["default"].string().required(),
        posist_data: _joi["default"].object().keys({
          customer_key: _joi["default"].string().required()
        }).required(),
        cokitchen_id: _joi["default"].string().required(),
        posist_customer_key: _joi["default"].string().required()
      }
    });
  },
  updateBrand: function updateBrand() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        brand_id: _joi["default"].string().required(),
        name: _joi["default"].string(),
        summary: _joi["default"].string(),
        description: _joi["default"].string(),
        logo: _joi["default"].string(),
        images: _joi["default"].array().items(image),
        brand_keywords: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        brand_descriptive_metadatas: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        }))
      }
    });
  },
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