"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var image = _joi["default"].string();

var MealCategoryValidator = {
  updateMealCategory: function updateMealCategory() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meal_category_id: _joi["default"].string().required(),
        summary: _joi["default"].string(),
        description: _joi["default"].string(),
        images: _joi["default"].array().items(image),
        meal_category_selection_type_id: _joi["default"].string(),
        selection_no: _joi["default"].string()
      }
    });
  }
};
var _default = MealCategoryValidator;
exports["default"] = _default;
//# sourceMappingURL=meal-category-validator.js.map