"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppFeedbacks = exports.createAppFeedback = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _app_feedback = _interopRequireDefault(require("../models/app_feedback"));

var _user = _interopRequireDefault(require("../models/user"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createAppFeedback = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, user, user_data, app_feedback_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            user = ctx.state.user.user;
            _context.next = 4;
            return _user["default"].query().findOne({
              id: user.id
            })["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 4:
            user_data = _context.sent;

            if (user_data) {
              _context.next = 9;
              break;
            }

            throw (0, _helpers.Unauthorized)('User not Found. Please sign up');

          case 9:
            body.user_id = user.id;
            _context.next = 12;
            return _app_feedback["default"].query().insert(body);

          case 12:
            app_feedback_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'App feedback posted Successfully'
            }, app_feedback_data));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAppFeedback(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createAppFeedback = createAppFeedback;

var getAppFeedbacks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, app_feedback_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context2.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context2.sent) {
              _context2.next = 11;
              break;
            }

            _context2.next = 7;
            return _app_feedback["default"].query().withGraphFetched('[user]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 7:
            app_feedback_data = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'App feedback data returned Successfully',
              data: app_feedback_data
            });

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAppFeedbacks(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAppFeedbacks = getAppFeedbacks;
//# sourceMappingURL=app_feedback.controller.js.map