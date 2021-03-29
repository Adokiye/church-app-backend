"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OtpService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _otp = _interopRequireDefault(require("../models/otp"));

var _JwtService = _interopRequireDefault(require("./JwtService"));

var OtpService = /*#__PURE__*/function () {
  function OtpService() {
    (0, _classCallCheck2["default"])(this, OtpService);
  }

  (0, _createClass2["default"])(OtpService, [{
    key: "sendOtp",
    value: function () {
      var _sendOtp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var phone_number, action, otp, otpToCreate;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phone_number = _ref.phone_number, action = _ref.action;
                otp = '2021';
                _context.next = 4;
                return _otp["default"].query().findOne({
                  phone_number: phone_number,
                  action: action
                })["catch"](function () {
                  return false;
                });

              case 4:
                otpToCreate = _context.sent;

                if (!otpToCreate) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return _otp["default"].query().patchAndFetchById(otpToCreate.id, {
                  otp_token: _JwtService["default"].sign({
                    phone_number: phone_number,
                    otp: otp,
                    action: action
                  }, {
                    expiresIn: process.env.OTP_EXPIRATION || '10m'
                  })
                });

              case 8:
                _context.next = 12;
                break;

              case 10:
                _context.next = 12;
                return _otp["default"].query().insert({
                  phone_number: phone_number,
                  action: action,
                  otp_token: _JwtService["default"].sign({
                    phone_number: phone_number,
                    otp: otp,
                    action: action
                  }, {
                    expiresIn: process.env.OTP_EXPIRATION || '10m'
                  })
                });

              case 12:
                return _context.abrupt("return", {
                  otp: otp
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sendOtp(_x) {
        return _sendOtp.apply(this, arguments);
      }

      return sendOtp;
    }()
  }]);
  return OtpService;
}();

exports.OtpService = OtpService;
var instance = new OtpService();
var _default = instance;
exports["default"] = _default;
//# sourceMappingURL=OtpService.js.map