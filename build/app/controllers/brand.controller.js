"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandsForCustomer = exports.updateBrand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brand = _interopRequireDefault(require("../models/brand"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _cokitchen_polygon = _interopRequireDefault(require("../models/cokitchen_polygon"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var updateBrand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var id, body, role, brand_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = ctx.params.id;
            body = ctx.request.body;
            role = ctx.state.user.user.role;

            if (!(0, _RoleService.checkIfMarketing)(role)) {
              _context.next = 11;
              break;
            }

            if (body.posist_data) {
              delete body.posist_data;
            }

            _context.next = 7;
            return _brand["default"].query().patchAndFetchById(id, body);

          case 7:
            brand_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, brand_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateBrand(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateBrand = updateBrand;

var getBrandsForCustomer = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, lat, lng, cokitchen_polygons, cokitchens, i, len;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            lat = body.lat, lng = body.lng;
            _context2.next = 4;
            return _cokitchen_polygon["default"].query().withGraphFetched('cokitchen.[brands]');

          case 4:
            cokitchen_polygons = _context2.sent;
            cokitchens = [];
            i = 0, len = cokitchen_polygons.length;

          case 7:
            if (!(i < len)) {
              _context2.next = 14;
              break;
            }

            if (!(0, _helpers.insidePolygon)([lat, lng], cokitchen_polygons[i].polygon)) {
              _context2.next = 11;
              break;
            }

            cokitchens.push(cokitchen_polygons[i].cokitchen);
            return _context2.abrupt("return", {
              status: 'success',
              data: cokitchen_polygons[i].cokitchen.brands
            });

          case 11:
            i++;
            _context2.next = 7;
            break;

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getBrandsForCustomer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getBrandsForCustomer = getBrandsForCustomer;
//# sourceMappingURL=brand.controller.js.map