"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = exports.calculateOrder = exports.getOrderTypes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _order_type = _interopRequireDefault(require("../models/order_type"));

var _order = _interopRequireDefault(require("../models/order"));

var _meal = _interopRequireDefault(require("../models/meal"));

var _addon = _interopRequireDefault(require("../models/addon"));

var _deal_type = _interopRequireDefault(require("../models/deal_type"));

var _deal = _interopRequireDefault(require("../models/deal"));

var _cokitchen_polygon = _interopRequireDefault(require("../models/cokitchen_polygon"));

var _calculated_order = _interopRequireDefault(require("../models/calculated_order"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

var getOrderTypes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var order_types;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order_types = _order_type["default"].query();
            return _context.abrupt("return", {
              status: 'success',
              message: 'Successful',
              data: order_types
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getOrderTypes(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getOrderTypes = getOrderTypes;

var calculateOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, service_charge, deal, _dealInDb, cokitchen_polygon, cokitchenPolygonInDb, i, len, meals, total_meal_amount, mealInDb, addons, addons_len, addonInDb, brand_found, _x3, _i, calculated_order;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;

            Array.prototype.sum = function (prop) {
              var total = 0;

              for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop];
              }

              return total;
            };

            service_charge = 0; //1- get deal from the db based on the request

            if (!body.deal) {
              _context2.next = 10;
              break;
            }

            deal = body.deal;
            _context2.next = 7;
            return _deal["default"].query().where({
              id: deal
            }).withGraphFetched('[brand, deal_type]')["catch"](function () {
              return false;
            });

          case 7:
            _dealInDb = _context2.sent;

            if (_dealInDb) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal: ["deal not found id:".concat(deal)]
              }
            }));

          case 10:
            //2- get the users cokitchen polygon
            cokitchen_polygon = body.cokitchen_polygon;
            _context2.next = 13;
            return _cokitchen_polygon["default"].query().where({
              id: cokitchen_polygon
            })["catch"](function () {
              return false;
            });

          case 13:
            cokitchenPolygonInDb = _context2.sent;

            if (cokitchenPolygonInDb) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                cokitchen_polygon: ["cokitchen_polygon not found id:".concat(cokitchen_polygon)]
              }
            }));

          case 16:
            //step 3- get all meals and addons from the db based on the request
            i = 0, len = body.meal_details.length;
            meals = [];
            total_meal_amount = 0;

          case 19:
            if (!(i < len)) {
              _context2.next = 61;
              break;
            }

            _context2.next = 22;
            return _meal["default"].query().where({
              id: body.meal_details[i].meal_id
            }).withGraphFetched('[brand]')["catch"](function () {
              return false;
            });

          case 22:
            mealInDb = _context2.sent;

            if (!mealInDb) {
              _context2.next = 57;
              break;
            }

            addons = [];

            if (!(body.meal_details[i].addons.length > 0)) {
              _context2.next = 41;
              break;
            }

            addons_len = body.meal_details[i].addons.length;

          case 27:
            if (!(j < addons_len)) {
              _context2.next = 41;
              break;
            }

            _context2.next = 30;
            return _addon["default"].query().where({
              id: body.meal_details[i].addons[j].addon_id
            })["catch"](function () {
              return false;
            });

          case 30:
            addonInDb = _context2.sent;

            if (!addonInDb) {
              _context2.next = 37;
              break;
            }

            addonInDb.qty = body.meal_details[i].addons[j].addon_qty;
            addonInDb.total_amount = body.meal_details[i].addons[j].addon_qty * addonInDb.amount;
            addons.push(addonInDb);
            _context2.next = 38;
            break;

          case 37:
            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                addon: ["addon not found meal-index:".concat(i, ", addon-index:").concat(j, " addon-id:").concat(body.meal_details[i].addons[j].addon_id)]
              }
            }));

          case 38:
            j++;
            _context2.next = 27;
            break;

          case 41:
            mealInDb.addons = addons;
            mealInDb.qty = body.meal_details[i].meal_qty;
            brand_found = false; // find the meals brand and push to that array

            _x3 = 0;

          case 45:
            if (!(_x3 < meals.length)) {
              _context2.next = 54;
              break;
            }

            if (!(meals[_x3].brand.id == mealInDb.brand.id)) {
              _context2.next = 51;
              break;
            }

            meals[_x3].meals.push(mealInDb);

            meals[_x3].amount += Number(mealInDb.amount) * Number(mealInDb.qty);
            brand_found = true;
            return _context2.abrupt("break", 54);

          case 51:
            _x3++;
            _context2.next = 45;
            break;

          case 54:
            if (!brand_found) {
              meals.push({
                brand: mealInDb.brand,
                meals: [mealInDb],
                amount: Number(mealInDb.amount) * Number(mealInDb.qty) + mealInDb.addons.sum('total_amount')
              });
            }

            _context2.next = 58;
            break;

          case 57:
            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                meal: ["meal not found meal-index:".concat(i, " meal-id:").concat(body.meal_details[i].meal_id)]
              }
            }));

          case 58:
            i++;
            _context2.next = 19;
            break;

          case 61:
            // if without deals meals amount is less than 2000, apply service charge
            if (meals.sum('amount') < 2000) {
              service_charge = 0.05;
            } // 4- if deal exists , apply deal to amount


            if (!body.deaL) {
              _context2.next = 79;
              break;
            }

            if (!(dealInDb.deal_type.name == 'BRAND')) {
              _context2.next = 75;
              break;
            }

            _i = 0;

          case 65:
            if (!(_i < meals.length)) {
              _context2.next = 72;
              break;
            }

            if (!(meals[x].brand.id == dealInDb.brand.id && dealInDb.min < meals[x].amount)) {
              _context2.next = 69;
              break;
            }

            //apply deal
            meals[x].amount -= meals[x].amount * dealInDb.rate;
            return _context2.abrupt("break", 72);

          case 69:
            _i++;
            _context2.next = 65;
            break;

          case 72:
            total_meal_amount += meals.sum('amount');
            _context2.next = 77;
            break;

          case 75:
            total_meal_amount += meals.sum('amount');

            if (dealInDb.min < total_meal_amount) {
              //apply deal
              total_meal_amount -= total_meal_amount * dealInDb.rate;
            }

          case 77:
            _context2.next = 80;
            break;

          case 79:
            total_meal_amount += meals.sum('amount');

          case 80:
            //5- service fee is applicable to orders of price less than NGN2000
            total_meal_amount += total_meal_amount * service_charge; //6 - add polygon delivery fee

            total_meal_amount += Number(cokitchenPolygonInDb.delivery_fee);
            _context2.next = 84;
            return _calculated_order["default"].query().insert({
              total_amount: total_meal_amount,
              service_charge: service_charge,
              delivery_fee: cokitchenPolygonInDb.delivery_fee
            });

          case 84:
            calculated_order = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'order calulated successfully',
              calculated_order: calculated_order
            });

          case 86:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function calculateOrder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.calculateOrder = calculateOrder;

var createOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, _yield$Promise$all, _yield$Promise$all2, orderTypeInDb, calculatedOrderInDb;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            _context3.next = 3;
            return Promise.all([_order_type["default"].query().where({
              id: body.order_type_id
            })["catch"](function () {
              return false;
            }), _calculated_order["default"].query().where({
              id: body.calculated_order_id
            })["catch"](function () {
              return false;
            }), Repository.Account.getAccountByAccountNumber(userTag)]);

          case 3:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            orderTypeInDb = _yield$Promise$all2[0];
            calculatedOrderInDb = _yield$Promise$all2[1];

            if (orderTypeInDb) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                order_type: ['order type not found']
              }
            }));

          case 9:
            if (calculatedOrderInDb) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                calculated_order: ['calculated order not found']
              }
            }));

          case 11:
            _context3.t0 = orderTypeInDb.name;
            _context3.next = _context3.t0 === 'WALLET' ? 14 : _context3.t0 === 'CARD' ? 15 : _context3.t0 === 'CASH' ? 16 : 17;
            break;

          case 14:
            return _context3.abrupt("break", 18);

          case 15:
            return _context3.abrupt("break", 18);

          case 16:
            return _context3.abrupt("break", 18);

          case 17:
            return _context3.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                order_type: ['order type not found']
              }
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createOrder(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createOrder = createOrder;
//# sourceMappingURL=order.controller.js.map