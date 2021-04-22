"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var image = _joi["default"].string();

var MealValidator = {
  updateMeal: function updateMeal() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meal_id: _joi["default"].string().required(),
        summary: _joi["default"].string(),
        description: _joi["default"].string(),
        images: _joi["default"].array().items(image),
        meal_keywords: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        meal_descriptive_metadatas: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        meal_business_metadatas: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        meal_dietary_metadatas: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })),
        meal_allergy_metadatas: _joi["default"].array().items(_joi["default"].object().keys({
          name: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        }))
      }
    });
  }
};
var _default = MealValidator;
exports["default"] = _default;
//# sourceMappingURL=meal-validator.js.map