"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var CokitchenExploreKeywordValidator = {
  create: function create() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        meal_keyword_id: _joi["default"].string().required(),
        cokitchen_id: _joi["default"].string().required()
      }
    });
  },
  "delete": function _delete() {
    return (0, _middlewares.validationMiddleware)({
      params: {
        id: _joi["default"].string().required()
      }
    });
  }
};
var _default = CokitchenExploreKeywordValidator;
exports["default"] = _default;
//# sourceMappingURL=cokitchen-explore-keyword-validator.js.map