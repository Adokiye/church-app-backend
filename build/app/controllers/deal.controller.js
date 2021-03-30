"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDealTypes = exports.updateDeal = exports.createDeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brand = _interopRequireDefault(require("../models/brand"));

var _deal = _interopRequireDefault(require("../models/deal"));

var _deal_type = _interopRequireDefault(require("../models/deal_type"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createDeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, deal_type_data, deals, i, len, brand_data, deal_data, _deal_data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context.sent) {
              _context.next = 38;
              break;
            }

            _context.next = 7;
            return _deal_type["default"].query().findById(body.deal_type_id)["catch"](function () {
              return false;
            });

          case 7:
            deal_type_data = _context.sent;

            if (deal_type_data) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_type: ['Deal type not found with that id']
              }
            }));

          case 10:
            if (!(deal_type_data.name === 'BRAND')) {
              _context.next = 32;
              break;
            }

            deals = [];
            i = 0, len = body.brands.length;

          case 13:
            if (!(i < len)) {
              _context.next = 29;
              break;
            }

            _context.next = 16;
            return _brand["default"].query().findById(body.brands[i])["catch"](function () {
              return false;
            });

          case 16:
            brand_data = _context.sent;

            if (!brand_data) {
              _context.next = 25;
              break;
            }

            body.brand_id = brand_data.id;
            _context.next = 21;
            return _deal["default"].query().insert(body).withGraphFetched('[deal_type]');

          case 21:
            deal_data = _context.sent;
            deals.push(deal_data);
            _context.next = 26;
            break;

          case 25:
            return _context.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_type: ['Brand not found for ' + body.brands[i]]
              }
            }));

          case 26:
            i++;
            _context.next = 13;
            break;

          case 29:
            return _context.abrupt("return", {
              status: 'success',
              message: 'Creation Successful',
              data: deals
            });

          case 32:
            _context.next = 34;
            return _deal["default"].query().insert(body).withGraphFetched('[deal_type]');

          case 34:
            _deal_data = _context.sent;
            return _context.abrupt("return", {
              status: 'success',
              message: 'Creation Successful',
              data: _deal_data
            });

          case 36:
            _context.next = 39;
            break;

          case 38:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createDeal(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createDeal = createDeal;

var updateDeal = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var id, body, role, deal_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = ctx.params.id;
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context2.next = 5;
            return (0, _RoleService.checkIfMarketing)(role);

          case 5:
            if (!_context2.sent) {
              _context2.next = 12;
              break;
            }

            _context2.next = 8;
            return _deal["default"].query().patchAndFetchById(id, body).withGraphFetched('[deal_type]');

          case 8:
            deal_data = _context2.sent;
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, deal_data));

          case 12:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateDeal(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateDeal = updateDeal;

var getDealTypes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var role, deal_types;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            role = ctx.state.user.user.role;
            _context3.next = 3;
            return (0, _RoleService.checkIfMarketing)(role);

          case 3:
            if (!_context3.sent) {
              _context3.next = 8;
              break;
            }

            deal_types = _deal_type["default"].query();
            return _context3.abrupt("return", {
              status: 'success',
              message: 'Successful',
              data: deal_types
            });

          case 8:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getDealTypes(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getDealTypes = getDealTypes;
//# sourceMappingURL=deal.controller.js.map