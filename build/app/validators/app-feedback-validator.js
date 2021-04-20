"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var AppFeedbackValidator = {
  createAppFeedback: function createAppFeedback() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        feedback: _joi["default"].string().required()
      }
    });
  }
};
var _default = AppFeedbackValidator;
exports["default"] = _default;
//# sourceMappingURL=app-feedback-validator.js.map