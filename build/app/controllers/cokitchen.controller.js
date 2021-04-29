"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCokitchens = exports.deleteCokitchenPolygon = exports.updateCokitchenPolygon = exports.createCokitchenPolygon = exports.updateCokitchen = exports.createCokitchen = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _meal = _interopRequireDefault(require("../models/meal"));

var _meal_category = _interopRequireDefault(require("../models/meal_category"));

var _cokitchen_polygon = _interopRequireDefault(require("../models/cokitchen_polygon"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createCokitchen = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var id, body, role, cokitchen_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = ctx.params.id;
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context.next = 5;
            return (0, _RoleService.checkIfMarketing)(role);

          case 5:
            if (!_context.sent) {
              _context.next = 13;
              break;
            }

            if (body.posist_data) {
              delete body.posist_data;
            }

            _context.next = 9;
            return _cokitchen["default"].query().insert(body)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid body');
            });

          case 9:
            cokitchen_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Creation Successful'
            }, cokitchen_data));

          case 13:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCokitchen(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createCokitchen = createCokitchen;

var updateCokitchen = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, cokitchen_id, cokitchen_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            cokitchen_id = body.cokitchen_id;
            delete body.cokitchen_id;
            _context2.next = 6;
            return (0, _RoleService.checkIfMarketing)(role);

          case 6:
            if (!_context2.sent) {
              _context2.next = 14;
              break;
            }

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            _context2.next = 10;
            return _cokitchen["default"].query().patchAndFetchById(cokitchen_id, body).withGraphFetched('[brands]');

          case 10:
            cokitchen_data = _context2.sent;
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, cokitchen_data));

          case 14:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateCokitchen(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateCokitchen = updateCokitchen;

var createCokitchenPolygon = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, _ctx$state$user$user, id, role, cokitchen_polygon_data;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            _ctx$state$user$user = ctx.state.user.user, id = _ctx$state$user$user.id, role = _ctx$state$user$user.role;
            _context3.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context3.sent) {
              _context3.next = 12;
              break;
            }

            if (body.polygon) {
              body.polygon = JSON.stringify(body.polygon);
            }

            _context3.next = 8;
            return _cokitchen_polygon["default"].query().insert(body)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 8:
            cokitchen_polygon_data = _context3.sent;
            return _context3.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Creation of cokitchen polygon Successful'
            }, cokitchen_polygon_data));

          case 12:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createCokitchenPolygon(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createCokitchenPolygon = createCokitchenPolygon;

var updateCokitchenPolygon = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var body, role, cokitchen_polygon_id, cokitchen_polygon_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            cokitchen_polygon_id = body.cokitchen_polygon_id;
            delete body.cokitchen_polygon_id;
            _context4.next = 6;
            return (0, _RoleService.checkIfMarketing)(role);

          case 6:
            if (!_context4.sent) {
              _context4.next = 14;
              break;
            }

            if (body.polygon) {
              body.polygon = JSON.stringify(body.polygon);
            }

            _context4.next = 10;
            return _cokitchen_polygon["default"].query().patchAndFetchById(cokitchen_polygon_id, body);

          case 10:
            cokitchen_polygon_data = _context4.sent;
            return _context4.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, cokitchen_polygon_data));

          case 14:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateCokitchenPolygon(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateCokitchenPolygon = updateCokitchenPolygon;

var deleteCokitchenPolygon = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var params, role;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            params = ctx.params;
            role = ctx.state.user.user.role;
            _context5.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context5.sent) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return _cokitchen_polygon["default"].query().deleteById(params.id)["catch"](function () {
              throw NotFound('Cokitchen polygon not found');
            });

          case 7:
            return _context5.abrupt("return", {
              status: 'success',
              message: 'Cokitchen polygon Deleted Successfully'
            });

          case 10:
            throw (0, _helpers.Unauthorized)('Unauthorized Delete');

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteCokitchenPolygon(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteCokitchenPolygon = deleteCokitchenPolygon;

var getAllCokitchens = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var _yield$Promise$all, _yield$Promise$all2, cokitchens, meal_categories;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all([_cokitchen["default"].query().withGraphJoined('[brands.[meals.[meal_category]],cokitchen_explore_keywords.[meal_keyword], cokitchen_polygons]').where('brands:meals.is_addon', false)["catch"](function (e) {
              console.log(e);
              return [];
            }), _meal_category["default"].query().withGraphFetched('[meal_category_selection_type]')["catch"](function (e) {
              console.log(e);
              return [];
            })]);

          case 2:
            _yield$Promise$all = _context6.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            cokitchens = _yield$Promise$all2[0];
            meal_categories = _yield$Promise$all2[1];
            return _context6.abrupt("return", {
              status: 'success',
              cokitchens: cokitchens,
              meal_categories: meal_categories
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllCokitchens(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllCokitchens = getAllCokitchens;
//# sourceMappingURL=cokitchen.controller.js.map