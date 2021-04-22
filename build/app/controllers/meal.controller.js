"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeals = exports.updateMeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _meal_category = _interopRequireDefault(require("../models/meal_category"));

var _meal = _interopRequireDefault(require("../models/meal"));

var _meal_category_selection_type = _interopRequireDefault(require("../models/meal_category_selection_type"));

var _user = _interopRequireDefault(require("../models/user"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var updateMeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, meal_id, meal_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            meal_id = body.meal_id;
            delete body.meal_id;
            _context.next = 6;
            return (0, _RoleService.checkIfMarketing)(role);

          case 6:
            if (!_context.sent) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return _meal["default"].query().patchAndFetchById(meal_id, body).withGraphFetched('[brand,addons.[meal_data]]')["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 9:
            meal_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal updated Successfully'
            }, meal_data));

          case 13:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateMeal(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateMeal = updateMeal;

var getMeals = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var meals_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _meal["default"].query().withGraphFetched('[addons.[meal_data],meal_category,brand.[cokitchen]]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            meals_data = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'Meals returned Successfully',
              data: meals_data
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getMeals(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMeals = getMeals;
//# sourceMappingURL=meal.controller.js.map