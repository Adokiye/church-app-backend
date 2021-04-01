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