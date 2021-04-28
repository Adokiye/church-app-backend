"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMealCategorySelectionTypes = exports.getMealCategories = exports.updateMealCategory = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _meal_category = _interopRequireDefault(require("../models/meal_category"));

var _meal_category_selection_type = _interopRequireDefault(require("../models/meal_category_selection_type"));

var _user = _interopRequireDefault(require("../models/user"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var updateMealCategory = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, meal_category_id, meal_category_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            meal_category_id = body.meal_category_id;
            delete body.meal_category_id;
            _context.next = 6;
            return (0, _RoleService.checkIfMarketing)(role);

          case 6:
            if (!_context.sent) {
              _context.next = 14;
              break;
            }

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            _context.next = 10;
            return _meal_category["default"].query().patchAndFetchById(meal_category_id, body).withGraphFetched('[selection_type]')["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 10:
            meal_category_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal category updated Successfully'
            }, meal_category_data));

          case 14:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateMealCategory(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateMealCategory = updateMealCategory;

var getMealCategories = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var meal_category_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _meal_category["default"].query().withGraphFetched('[meal_category_selection_type]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            meal_category_data = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'Meal categories returned Successfully',
              data: meal_category_data
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getMealCategories(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMealCategories = getMealCategories;

var getMealCategorySelectionTypes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var meal_category_selection_type_data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _meal_category_selection_type["default"].query() //  .withGraphFetched('[meal_categories]')
            ["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            meal_category_selection_type_data = _context3.sent;
            return _context3.abrupt("return", {
              status: 'success',
              message: 'Meal category selection types returned Successfully',
              data: meal_category_selection_type_data
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMealCategorySelectionTypes(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMealCategorySelectionTypes = getMealCategorySelectionTypes;
//# sourceMappingURL=meal_category.controller.js.map