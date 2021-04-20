"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAddress = exports.updateAddress = exports.createNewAddress = exports.getSavedAddress = exports.updateUserSettings = exports.getUserSettings = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user_setting = _interopRequireDefault(require("../models/user_setting"));

var _user_saved_address = _interopRequireDefault(require("../models/user_saved_address"));

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getUserSettings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var user, user_settings_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = ctx.state.user.user;
            _context.next = 3;
            return _user_setting["default"].query().findOne({
              user_id: user.id
            })["catch"](function () {
              return false;
            });

          case 3:
            user_settings_data = _context.sent;

            if (user_settings_data) {
              _context.next = 8;
              break;
            }

            throw (0, _helpers.Unauthorized)('User not found. Please sign up');

          case 8:
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: "User's Settings data returned Successfully"
            }, user_settings_data));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserSettings(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserSettings = getUserSettings;

var updateUserSettings = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var user, body, user_settings_id, user_settings_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = ctx.state.user.user;
            body = ctx.request.body;
            user_settings_id = body.user_settings_id;
            delete body.user_settings_id;
            _context2.next = 6;
            return _user_setting["default"].query().patchAndFetchById(user_settings_id, body)["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 6:
            user_settings_data = _context2.sent;

            if (user_settings_data) {
              _context2.next = 11;
              break;
            }

            throw (0, _helpers.NotFound)('User Settings data not found.');

          case 11:
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: "User's Settings data updated Successfully"
            }, user_settings_data));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateUserSettings(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // user address setting save


exports.updateUserSettings = updateUserSettings;

var getSavedAddress = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var user, user_saved_address_data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = ctx.state.user.user;
            _context3.next = 3;
            return _user_saved_address["default"].query().where({
              user_id: user.id
            })["catch"](function () {
              return false;
            });

          case 3:
            user_saved_address_data = _context3.sent;

            if (user_saved_address_data) {
              _context3.next = 8;
              break;
            }

            throw (0, _helpers.Unauthorized)('User not found. Please sign up');

          case 8:
            return _context3.abrupt("return", {
              status: 'success',
              message: "User's Saved address data returned Successfully",
              data: user_saved_address_data
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getSavedAddress(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSavedAddress = getSavedAddress;

var createNewAddress = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var user, body, name, user_saved_address_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = ctx.state.user.user;
            body = ctx.request.body;
            name = body.name.toLowerCase();
            delete body.name;
            _context4.next = 6;
            return _user_saved_address["default"].query().findOne({
              user_id: user.id,
              name: name
            })["catch"](function (e) {
              console.log(e);
              false;
            });

          case 6:
            user_saved_address_data = _context4.sent;

            if (!user_saved_address_data) {
              _context4.next = 11;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('Address name already exists for ' + name);

          case 11:
            _context4.next = 13;
            return _user_saved_address["default"].query().insert(_objectSpread({
              user_id: user.id,
              name: name
            }, body))["catch"](function () {
              throw (0, _helpers.UnprocessableEntity)('Invalid body');
            });

          case 13:
            user_saved_address_data = _context4.sent;
            return _context4.abrupt("return", _objectSpread({
              status: 'success',
              message: "User's Address created Successfully"
            }, user_saved_address_data));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createNewAddress(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createNewAddress = createNewAddress;

var updateAddress = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var user, body, user_saved_address_data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = ctx.state.user.user;
            body = ctx.request.body;
            body.user_id = user.id;
            _context5.next = 5;
            return _user_saved_address["default"].query().patchAndFetchById(body.user_saved_address_id, body)["catch"](function () {
              return false;
            });

          case 5:
            user_saved_address_data = _context5.sent;

            if (user_saved_address_data) {
              _context5.next = 10;
              break;
            }

            throw (0, _helpers.Unauthorized)('User Saved address data not found.');

          case 10:
            return _context5.abrupt("return", _objectSpread({
              status: 'success',
              message: "User's Saved Address data updated Successfully"
            }, user_saved_address_data));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateAddress(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateAddress = updateAddress;

var deleteAddress = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var user, params, user_saved_address_data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = ctx.state.user.user;
            params = ctx.params;
            _context6.next = 4;
            return _user_saved_address["default"].query().deleteById(params.id)["catch"](function () {
              throw (0, _helpers.NotFound)('User saved address with id ' + params.id + ' not found');
            });

          case 4:
            user_saved_address_data = _context6.sent;
            return _context6.abrupt("return", {
              status: 'success',
              message: 'User saved address Deleted Successfully'
            });

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteAddress(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteAddress = deleteAddress;
//# sourceMappingURL=user_settings.controller.js.map