"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _middlewares = require("../middlewares");

var FaqValidator = {
  createFaq: function createFaq() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        question: _joi["default"].string().required(),
        answer: _joi["default"].string().required()
      }
    });
  },
  updateFaq: function updateFaq() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        faq_id: _joi["default"].string().required(),
        question: _joi["default"].string(),
        answer: _joi["default"].string()
      }
    });
  },
  updateFaqArrangment: function updateFaqArrangment() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        faq_arrangement: _joi["default"].array().items(_joi["default"].object().keys({
          question: _joi["default"].string().required(),
          answer: _joi["default"].string().required(),
          id: _joi["default"].string().required()
        })).required()
      }
    });
  },
  deleteFaq: function deleteFaq() {
    return (0, _middlewares.validationMiddleware)({
      params: {
        id: _joi["default"].string().required()
      }
    });
  }
};
var _default = FaqValidator;
exports["default"] = _default;
//# sourceMappingURL=faq-validator.js.map