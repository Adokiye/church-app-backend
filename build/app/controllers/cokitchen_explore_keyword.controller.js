"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCokitchenExploreKeyword = exports.getCokitchenExploreKeywords = exports.createCokitchenExploreKeyword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cokitchen_explore_keyword = _interopRequireDefault(require("../models/cokitchen_explore_keyword"));

var _meal_keyword = _interopRequireDefault(require("../models/meal_keyword"));

var _user = _interopRequireDefault(require("../models/user"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createCokitchenExploreKeyword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, meal_keyword_data, cokitchen_explore_keyword_data;
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
              _context.next = 23;
              break;
            }

            _context.next = 7;
            return _meal_keyword["default"].query().findOne({
              id: body.meal_keyword_id
            })["catch"](function (e) {});

          case 7:
            meal_keyword_data = _context.sent;

            if (!(meal_keyword_data.images != null && meal_keyword_data.images.length > 0)) {
              _context.next = 20;
              break;
            }

            _context.next = 11;
            return _cokitchen_explore_keyword["default"].query().findOne({
              cokitchen_id: body.cokitchen_id,
              meal_keyword_id: body.meal_keyword_id
            }) //.withGraphFetched('[cokitchen, meal_keyword]')
            ["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 11:
            cokitchen_explore_keyword_data = _context.sent;

            if (!cokitchen_explore_keyword_data) {
              _context.next = 14;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('Invalid body, explore data already exists');

          case 14:
            _context.next = 16;
            return _cokitchen_explore_keyword["default"].query().insert(body) //.withGraphFetched('[cokitchen, meal_keyword]')
            ["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid body ' + e);
            });

          case 16:
            cokitchen_explore_keyword_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Cokitchen explore keyword created Successfully'
            }, cokitchen_explore_keyword_data));

          case 20:
            throw (0, _helpers.UnprocessableEntity)('Meal keyword needs to have an image before it can be made a cokitchen explore keyword');

          case 21:
            _context.next = 24;
            break;

          case 23:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCokitchenExploreKeyword(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createCokitchenExploreKeyword = createCokitchenExploreKeyword;

var getCokitchenExploreKeywords = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var cokitchen_explore_keywords;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _cokitchen_explore_keyword["default"].query().withGraphFetched('[meal_keyword]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            cokitchen_explore_keywords = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'Cokitchen explore keywords returned Successfully',
              data: cokitchen_explore_keywords
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCokitchenExploreKeywords(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCokitchenExploreKeywords = getCokitchenExploreKeywords;

var deleteCokitchenExploreKeyword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var params, role, cokitchen_explore_keyword_data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = ctx.params;
            role = ctx.state.user.user.role;
            _context3.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context3.sent) {
              _context3.next = 11;
              break;
            }

            _context3.next = 7;
            return _cokitchen_explore_keyword["default"].query().deleteById(params.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Cokitchen explore keyword not found');
            });

          case 7:
            cokitchen_explore_keyword_data = _context3.sent;
            return _context3.abrupt("return", {
              status: 'success',
              message: 'Cokitchen explore keyword Deleted Successfully'
            });

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Delete');

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteCokitchenExploreKeyword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteCokitchenExploreKeyword = deleteCokitchenExploreKeyword;
//# sourceMappingURL=cokitchen_explore_keyword.controller.js.map