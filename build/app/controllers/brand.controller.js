"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrandsForMarketing = exports.getBrandsForCustomer = exports.updateBrand = exports.createBrand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brand = _interopRequireDefault(require("../models/brand"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _cokitchen_polygon = _interopRequireDefault(require("../models/cokitchen_polygon"));

var _meal_category = _interopRequireDefault(require("../models/meal_category"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createBrand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var id, body, role, brand_data;
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

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            _context.next = 9;
            return _brand["default"].query().insert(body)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid body');
            });

          case 9:
            brand_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand Created Successfully'
            }, brand_data));

          case 13:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createBrand(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createBrand = createBrand;

var updateBrand = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, brand_id, brand_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            brand_id = body.brand_id;
            delete body.brand_id;

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            if (body.brand_descriptive_metadatas) {
              body.brand_descriptive_metadatas = JSON.stringify(body.brand_descriptive_metadatas);
            }

            if (body.brand_business_metadatas) {
              body.brand_business_metadatas = JSON.stringify(body.brand_business_metadatas);
            }

            if (body.brand_keywords) {
              body.brand_keywords = JSON.stringify(body.brand_keywords);
            }

            _context2.next = 10;
            return (0, _RoleService.checkIfMarketing)(role);

          case 10:
            if (!_context2.sent) {
              _context2.next = 18;
              break;
            }

            if (body.posist_data) {
              delete body.posist_data;
            }

            _context2.next = 14;
            return _brand["default"].query().patchAndFetchById(brand_id, body);

          case 14:
            brand_data = _context2.sent;
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, brand_data));

          case 18:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateBrand(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateBrand = updateBrand;

var getBrandsForCustomer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, lat, lng, cokitchen_polygons, i, len, _yield$Promise$all, _yield$Promise$all2, cokitchens, meal_categories;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            lat = body.lat, lng = body.lng;
            _context3.next = 4;
            return _cokitchen_polygon["default"].query() // .withGraphFetched('[cokitchen.[brands.[meals],cokitchen_explore_keywords]]')
            ["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 4:
            cokitchen_polygons = _context3.sent;
            i = 0, len = cokitchen_polygons.length;

          case 6:
            if (!(i < len)) {
              _context3.next = 18;
              break;
            }

            if (!(0, _helpers.insidePolygon)([lat, lng], cokitchen_polygons[i].polygon)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 10;
            return Promise.all([_cokitchen["default"].query().where('cokitchens.id', cokitchen_polygons[i].cokitchen_id).withGraphJoined('[brands.[meal_categories.[meals,meal_category_selection_type(selectNameAndId)]],cokitchen_explore_keywords.[meal_keyword], cokitchen_polygons]').where('brands:meal_categories:meals.is_addon', false).modifiers({
              selectNameAndId: function selectNameAndId(builder) {
                builder.select('name', 'id');
              }
            })["catch"](function (e) {
              console.log(e);
              return [];
            }), _meal_category["default"].query().withGraphFetched('[meal_category_selection_type]')["catch"](function (e) {
              console.log(e);
              return [];
            })]);

          case 10:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            cokitchens = _yield$Promise$all2[0];
            meal_categories = _yield$Promise$all2[1];
            return _context3.abrupt("return", {
              status: 'success',
              data: cokitchens[0].brands,
              cokitchen_explore_keywords: cokitchens[0].cokitchen_explore_keywords,
              meal_categories: meal_categories
            });

          case 15:
            i++;
            _context3.next = 6;
            break;

          case 18:
            throw (0, _helpers.UnprocessableEntity)('Invalid Latitude and Longitude');

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBrandsForCustomer(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getBrandsForCustomer = getBrandsForCustomer;

var getBrandsForMarketing = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var brands;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _brand["default"].query().withGraphFetched('[cokitchen,meals]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            brands = _context4.sent;
            return _context4.abrupt("return", {
              status: 'success',
              data: brands
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getBrandsForMarketing(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getBrandsForMarketing = getBrandsForMarketing;
//# sourceMappingURL=brand.controller.js.map