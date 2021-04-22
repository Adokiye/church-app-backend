"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var KeywordValidator = {
  create: function create() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        name: _joi["default"].string().required()
      }
    });
  },
  update: function update() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        name: _joi["default"].string(),
        icon: _joi["default"].string(),
        keyword_id: _joi["default"].string().required(),
        keyword_type: _joi["default"].string().required().valid('meal_allergy_metadata', 'meal_keyword'),
        images: _joi["default"].array().items(_joi["default"].string().required())
      }
    });
  },
  "delete": function _delete() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        id: _joi["default"].string().required()
      }
    });
  }
};
var _default = KeywordValidator;
exports["default"] = _default;
//# sourceMappingURL=keyword-validator.js.map