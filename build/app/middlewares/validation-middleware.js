"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationMiddleware = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _helpers = require("../helpers");

var validateObject = function validateObject() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var label = arguments.length > 1 ? arguments[1] : undefined;
  var schema = arguments.length > 2 ? arguments[2] : undefined;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  if (schema) {
    var _Joi$object$validate = _joi["default"].object(schema).validate(object, options),
        error = _Joi$object$validate.error,
        value = _Joi$object$validate.value;

    if (error) {
      throw new Error("".concat(error.message.replace(/"/g, '')));
    }
  }
};

var validationMiddleware = function validationMiddleware(validationObj) {
  return function (ctx, next) {
    try {
      validateObject(ctx.headers, 'Headers', validationObj.headers, {
        allowUnknown: true
      });
      validateObject(ctx.params, 'URL Parameters', validationObj.params);
      validateObject(ctx.query, 'URL Query', validationObj.query);

      if (ctx.request.body) {
        validateObject(ctx.request.body, 'Request Body', validationObj.body);
      }

      if (ctx.request.files) {
        validateObject(ctx.request.files, 'Request Files', validationObj.files);
      }

      return next();
    } catch (err) {
      throw (0, _helpers.BadRequest)(err.message);
    }
  };
};

exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation-middleware.js.map