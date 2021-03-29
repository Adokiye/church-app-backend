"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var decodeToken = function decodeToken(token) {
  try {
    var decodedToken = (0, _jwtDecode["default"])(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return {
        status: false,
        message: 'expired'
      };
    }

    return decodedToken;
  } catch (error) {
    return {
      status: false,
      message: 'invalid'
    };
  }
};

exports.decodeToken = decodeToken;
//# sourceMappingURL=decodeToken.js.map