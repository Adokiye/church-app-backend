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

var _addons = _interopRequireDefault(require("../models/addons"));

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
    var body, discount_code, cokitchen_polygon_id, meals, address, dealInDb, service_charge, cokitchenPolygonInDb, i, len, selected_meals, total_meal_amount, mealInDb, addons, addons_len, addonInDb, brand_found, _x3, _i, calculated_order;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body; // initialize the body variables

            discount_code = body.discount_code;
            cokitchen_polygon_id = body.cokitchen_polygon_id;
            meals = body.meals;
            address = body.address;
            dealInDb = {
              id: ''
            };

            Array.prototype.sum = function (prop) {
              var total = 0;

              for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop];
              }

              return total;
            }; // make service charge 0 at first in case the order is greater than 1999


            service_charge = 0; // calculate the order based on each body value
            //1- get deal from the db based on the request if discount code exists

            if (!discount_code) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return _deal["default"].query().where({
              discount_code: discount_code
            }).withGraphFetched('[brand, deal_type, deal_requirement_type, deal_eligibility_type, deal_value_type]')["catch"](function () {
              return false;
            });

          case 11:
            dealInDb = _context2.sent;

            if (dealInDb) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                discount_code: ["deal not found for discount code:".concat(discount_code)]
              }
            }));

          case 14:
            _context2.next = 16;
            return _cokitchen_polygon["default"].query().where({
              id: cokitchen_polygon_id
            })["catch"](function () {
              return false;
            });

          case 16:
            cokitchenPolygonInDb = _context2.sent;

            if (cokitchenPolygonInDb) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                cokitchen_polygon_id: ["cokitchen_polygon not found for id:".concat(cokitchen_polygon_id)]
              }
            }));

          case 19:
            //step 3- get all meals and addons from the db based on the request
            i = 0, len = meals.length;
            selected_meals = [];
            total_meal_amount = 0;

          case 22:
            if (!(i < len)) {
              _context2.next = 64;
              break;
            }

            _context2.next = 25;
            return _meal["default"].query().where({
              id: meals[i].id
            }).withGraphFetched('[brand]')["catch"](function () {
              return false;
            });

          case 25:
            mealInDb = _context2.sent;

            if (!mealInDb) {
              _context2.next = 60;
              break;
            }

            addons = [];

            if (!(meals[i].addons.length > 0)) {
              _context2.next = 44;
              break;
            }

            addons_len = meals[i].addons.length;

          case 30:
            if (!(j < addons_len)) {
              _context2.next = 44;
              break;
            }

            _context2.next = 33;
            return _addons["default"].query().where({
              id: meals[i].addons[j].id
            })["catch"](function () {
              return false;
            });

          case 33:
            addonInDb = _context2.sent;

            if (!addonInDb) {
              _context2.next = 40;
              break;
            }

            addonInDb.quantity = meals[i].addons[j].quantity;
            addonInDb.total_amount = meals[i].addons[j].quantity * addonInDb.amount;
            addons.push(addonInDb);
            _context2.next = 41;
            break;

          case 40:
            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                addon: ["addon not found meal-index:".concat(i, ", addon-index:").concat(j, " addon-id:").concat(meals[i].addons[j].id)]
              }
            }));

          case 41:
            j++;
            _context2.next = 30;
            break;

          case 44:
            mealInDb.addons = addons;
            mealInDb.quantity = meals[i].quantity;
            brand_found = false; // find the meals brand and push to that array

            _x3 = 0;

          case 48:
            if (!(_x3 < selected_meals.length)) {
              _context2.next = 57;
              break;
            }

            if (!(selected_meals[_x3].brand.id == mealInDb.brand.id)) {
              _context2.next = 54;
              break;
            }

            selected_meals[_x3].meals.push(mealInDb);

            selected_meals[_x3].amount += Number(mealInDb.amount) * mealInDb.quantity + mealInDb.addons.sum('total_amount');
            brand_found = true;
            return _context2.abrupt("break", 57);

          case 54:
            _x3++;
            _context2.next = 48;
            break;

          case 57:
            if (!brand_found) {
              selected_meals.push({
                brand: mealInDb.brand,
                meals: [mealInDb],
                amount: Number(mealInDb.amount) * mealInDb.quantity + mealInDb.addons.sum('total_amount')
              });
            }

            _context2.next = 61;
            break;

          case 60:
            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                meal: ["meal not found meal-index:".concat(i, " meal-id:").concat(meals[i].id)]
              }
            }));

          case 61:
            i++;
            _context2.next = 22;
            break;

          case 64:
            // if without deals meals amount is less than 2000, apply service charge
            if (selected_meals.sum('amount') < 2000) {
              service_charge = 60;
            } // 4- if deal exists , apply deal to amount


            if (!discount_code) {
              _context2.next = 82;
              break;
            }

            if (!(dealInDb.deal_type.name == 'BRAND')) {
              _context2.next = 78;
              break;
            }

            _i = 0;

          case 68:
            if (!(_i < selected_meals.length)) {
              _context2.next = 75;
              break;
            }

            if (!(selected_meals[x].brand.id == dealInDb.brand.id && dealInDb.min < selected_meals[x].amount)) {
              _context2.next = 72;
              break;
            }

            //apply deal
            selected_meals[x].amount -= selected_meals[x].amount * dealInDb.rate;
            return _context2.abrupt("break", 75);

          case 72:
            _i++;
            _context2.next = 68;
            break;

          case 75:
            total_meal_amount += selected_meals.sum('amount');
            _context2.next = 80;
            break;

          case 78:
            total_meal_amount += selected_meals.sum('amount');

            if (dealInDb.min < total_meal_amount) {
              //apply deal
              total_meal_amount -= total_meal_amount * dealInDb.rate;
            }

          case 80:
            _context2.next = 83;
            break;

          case 82:
            total_meal_amount += selected_meals.sum('amount');

          case 83:
            //5- service fee is applicable to orders of price less than NGN2000
            total_meal_amount += total_meal_amount + service_charge; //6 - add polygon delivery fee

            total_meal_amount += Number(cokitchenPolygonInDb.delivery_fee);
            _context2.next = 87;
            return _calculated_order["default"].query().insert({
              total_amount: total_meal_amount,
              service_charge: service_charge,
              delivery_fee: cokitchenPolygonInDb.delivery_fee,
              address: address,
              meals: selected_meals,
              cokitchen_polygon_id: cokitchen_polygon_id,
              deal_id: dealInDb.id
            });

          case 87:
            calculated_order = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'order calulated successfully',
              calculated_order: calculated_order
            });

          case 89:
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