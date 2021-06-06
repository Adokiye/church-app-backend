"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = exports.getToken = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _koaJwt = _interopRequireDefault(require("koa-jwt"));

var _config = require("../config");

var _helpers = require("../helpers");

var _user = _interopRequireDefault(require("../models/user"));

var getToken = function getToken(_ref) {
  var headers = _ref.headers;

  if (!headers.authorization) {
    throw (0, _helpers.Unauthorized)('You need to submit a token');
  }

  var _headers$authorizatio = headers.authorization.split(' '),
      _headers$authorizatio2 = (0, _slicedToArray2["default"])(_headers$authorizatio, 2),
      bearer = _headers$authorizatio2[0],
      token = _headers$authorizatio2[1];

  if (bearer !== 'Bearer') {
    throw (0, _helpers.Unauthorized)('Invalid token');
  }

  return token;
};

exports.getToken = getToken;
var authMiddleware = (0, _koaJwt["default"])({
  secret: _config.JWT_SECRET,
  getToken: getToken
}).unless({
  path: ['/v1/auth/login', '/v1/auth/login-marketing', '/v1/auth/login-logistics-admin', '/v1/auth/forget', '/v1/auth/reset', '/v1/auth/guest/authenticate', '/v1/auth/verify', '/v1/auth/resend', '/public', '/', '/v1/banks', '/v1/api/swagger-html', /^\/v1\/internal\/.*/, /^\/v1\/posist\/.*/, /^\/v1\/paystack\/.*/]
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map