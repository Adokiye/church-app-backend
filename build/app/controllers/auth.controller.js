"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.me = exports.login = exports.updateDeviceToken = exports.update = exports.create = exports.verifyOtp = exports.sendOtp = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

var _JwtService = _interopRequireDefault(require("../services/JwtService"));

var _OtpService = _interopRequireDefault(require("../services/OtpService"));

var _otp = _interopRequireDefault(require("../models/otp"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _helpers = require("../helpers");

var _device_token = _interopRequireDefault(require("../models/device_token"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var status = 'success';
var message = 'Success!';

var sendOtp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            _context.next = 3;
            return _OtpService["default"].sendOtp({
              phone_number: body.phone_number,
              action: body.action
            });

          case 3:
            return _context.abrupt("return", {
              status: 'success',
              message: 'Otp sent successfully'
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendOtp(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendOtp = sendOtp;

var verifyOtp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx, next) {
    var body, otpInDb, _JwtService$verify, status, message, decoded;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;

            if (body.otp) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              status: 'error',
              message: 'Validation Error',
              errors: {
                otp: ['otp is required']
              }
            }));

          case 3:
            _context2.next = 5;
            return _otp["default"].query().findOne({
              phone_number: body.phone_number,
              action: body.action
            })["catch"](function () {
              return false;
            });

          case 5:
            otpInDb = _context2.sent;

            if (!otpInDb) {
              ctx["throw"](404, 'no otp has been sent to this number');
            }

            _JwtService$verify = _JwtService["default"].verify(otpInDb.otp_token), status = _JwtService$verify.status, message = _JwtService$verify.message, decoded = _JwtService$verify.decoded;

            if (!status) {
              ctx["throw"](400, "otp is ".concat(message));
            }

            if (decoded.otp !== body.otp) {
              ctx["throw"](400, 'Invalid otp');
            }

            return _context2.abrupt("return", next());

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyOtp(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyOtp = verifyOtp;

var create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var _ctx$request$body, phone_number, email, first_name, last_name, other_name, user_gender, password, address, marital_status, employment_status, educational_background, baptismal_status, role, userInDb, roleInDb, random, userData;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _helpers.encryptPassword)(ctx.request.body.password);

          case 2:
            ctx.request.body.password = _context3.sent;
            _ctx$request$body = ctx.request.body, phone_number = _ctx$request$body.phone_number, email = _ctx$request$body.email, first_name = _ctx$request$body.first_name, last_name = _ctx$request$body.last_name, other_name = _ctx$request$body.other_name, user_gender = _ctx$request$body.user_gender, password = _ctx$request$body.password, address = _ctx$request$body.address, marital_status = _ctx$request$body.marital_status, employment_status = _ctx$request$body.employment_status, educational_background = _ctx$request$body.educational_background, baptismal_status = _ctx$request$body.baptismal_status, role = _ctx$request$body.role;
            _context3.next = 6;
            return _user["default"].query().findOne({
              phone_number: phone_number
            })["catch"](function () {
              return false;
            });

          case 6:
            userInDb = _context3.sent;
            _context3.next = 9;
            return _role["default"].query().where('name', role).limit(1).first()["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.NotFound)('Role not found');
            });

          case 9:
            roleInDb = _context3.sent;

            random = function random(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            };

            if (userInDb) {
              _context3.next = 18;
              break;
            }

            _context3.next = 14;
            return _user["default"].query().insert({
              email: email,
              first_name: first_name,
              last_name: last_name,
              other_name: other_name,
              user_gender: user_gender,
              password: password,
              address: address,
              marital_status: marital_status,
              employment_status: employment_status,
              educational_background: educational_background,
              baptismal_status: baptismal_status,
              role: role,
              member_code: random(100000, 999999).toString()
            })["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 14:
            userData = _context3.sent;
            return _context3.abrupt("return", _objectSpread(_objectSpread({
              status: status,
              message: message
            }, userData), {}, {
              token: _JwtService["default"].sign({
                user: userData.user
              })
            }));

          case 18:
            throw (0, _helpers.UnprocessableEntity)('User already exists');

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function create(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var body, user, roleInDb, user_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = ctx.request.body;
            user = ctx.state.user.user;

            if (!body.role) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return _role["default"].query().where('name', role).limit(1).first()["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.NotFound)('Role not found');
            });

          case 5:
            roleInDb = _context4.sent;

          case 6:
            _context4.next = 8;
            return _user["default"].query().patchAndFetchById(user.id, body);

          case 8:
            user_data = _context4.sent;
            return _context4.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, user_data));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function update(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.update = update;

var updateDeviceToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var body, id, user, userData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = ctx.request.body;
            id = ctx.state.user.user.id;
            _context5.next = 4;
            return _user["default"].query().findOne({
              id: id
            })["catch"](function () {
              throw (0, _helpers.Unauthorized)('User not found please register');
            });

          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return _device_token["default"].query().insert(_objectSpread({
              user_id: user.id
            }, body))["catch"](function () {
              throw (0, _helpers.UnprocessableEntity)('Invalid body');
            });

          case 7:
            userData = _context5.sent;
            return _context5.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Device Token Update Successful'
            }, userData));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateDeviceToken(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateDeviceToken = updateDeviceToken;

var login = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var body, user, isValid;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            body = ctx.request.body;
            _context6.next = 3;
            return _user["default"].query().findOne({
              email: body.email
            })["catch"](function () {
              throw (0, _helpers.Unauthorized)('User not found. Please sign up');
            });

          case 3:
            user = _context6.sent;
            _context6.next = 6;
            return _bcryptjs["default"].compare(body.password, user.password);

          case 6:
            isValid = _context6.sent;

            if (isValid) {
              _context6.next = 9;
              break;
            }

            throw (0, _helpers.Unauthorized)('Unauthorized, invalid password');

          case 9:
            return _context6.abrupt("return", _objectSpread(_objectSpread({
              status: status,
              message: message
            }, user), {}, {
              token: _JwtService["default"].sign({
                user: user
              })
            }));

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function login(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.login = login;

var me = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx) {
    var user, user_data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = ctx.state.user.user;
            _context7.next = 3;
            return _user["default"].query().findOne({
              id: user.id
            }) //  .withGraphFetched('[free_deliveries, referral_code]')
            ["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 3:
            user_data = _context7.sent;

            if (user_data) {
              _context7.next = 8;
              break;
            }

            throw (0, _helpers.Unauthorized)('User not found. Please sign up');

          case 8:
            return _context7.abrupt("return", _objectSpread({
              status: status,
              message: 'User data gotten successfully'
            }, user_data));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function me(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.me = me;
//# sourceMappingURL=auth.controller.js.map