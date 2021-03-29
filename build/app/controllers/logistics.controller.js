"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogisticsRider = exports.createLogisticsAdmin = exports.createLogisticsCompany = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _logistics_company = _interopRequireDefault(require("../models/logistics_company"));

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createLogisticsCompany = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, logistics_company_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;

            if (!(0, _RoleService.checkIfLogisticsSuperAdmin)(role)) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return _logistics_company["default"].query().insert(body);

          case 5:
            logistics_company_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Creation Successful'
            }, logistics_company_data));

          case 9:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createLogisticsCompany(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createLogisticsCompany = createLogisticsCompany;

var createLogisticsAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, logisticsAdminRole, logistics_admin_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context2.next = 4;
            return _role["default"].query().findOne({
              name: 'LOGISTICS_ADMIN'
            });

          case 4:
            logisticsAdminRole = _context2.sent;

            if (!(0, _RoleService.checkIfLogisticsSuperAdmin)(role)) {
              _context2.next = 17;
              break;
            }

            body.active = false;
            body.role_id = logisticsAdminRole.id;
            _context2.next = 10;
            return (0, _helpers.encryptPassword)(body.password);

          case 10:
            body.password = _context2.sent;
            _context2.next = 13;
            return _user["default"].query().insert(body);

          case 13:
            logistics_admin_data = _context2.sent;
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Creation Successful'
            }, logistics_admin_data));

          case 17:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createLogisticsAdmin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createLogisticsAdmin = createLogisticsAdmin;

var createLogisticsRider = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, role, riderRole, rider_data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context3.next = 4;
            return _role["default"].query().findOne({
              name: 'RIDER'
            });

          case 4:
            riderRole = _context3.sent;

            if (!(0, _RoleService.checkIfLogisticsAdmin)(role)) {
              _context3.next = 17;
              break;
            }

            body.active = false;
            _context3.next = 9;
            return (0, _helpers.encryptPassword)(body.password);

          case 9:
            body.password = _context3.sent;
            body.role_id = riderRole.id;
            _context3.next = 13;
            return _user["default"].query().insert(body);

          case 13:
            rider_data = _context3.sent;
            return _context3.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Creation Successful'
            }, rider_data));

          case 17:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createLogisticsRider(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createLogisticsRider = createLogisticsRider;
//# sourceMappingURL=logistics.controller.js.map