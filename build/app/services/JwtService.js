"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _require = require("../config"),
    JWT_SECRET = _require.JWT_SECRET,
    EXPIRE_TIME = _require.EXPIRE_TIME;

var JwtService = /*#__PURE__*/function () {
  function JwtService() {
    (0, _classCallCheck2["default"])(this, JwtService);
  }

  (0, _createClass2["default"])(JwtService, null, [{
    key: "sign",
    value: function sign(data) {
      return _jsonwebtoken["default"].sign(data, JWT_SECRET, {
        expiresIn: EXPIRE_TIME
      });
    }
  }, {
    key: "verify",
    value: function verify(token) {
      var response = {
        status: false,
        message: 'invalid',
        decoded: {
          otp: ''
        }
      };

      _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
          console.log(err);
          response.status = false;

          if (err.message === 'jwt expired') {
            response.message = 'expired';
          }

          return response;
        }

        response.decoded = decoded;
        response.status = true;
        response.message = 'valid';
        return response;
      });

      return response;
    }
  }]);
  return JwtService;
}();

exports["default"] = JwtService;
//# sourceMappingURL=JwtService.js.map