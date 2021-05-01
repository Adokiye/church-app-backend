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

var _user = _interopRequireDefault(require("../models/user"));

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
    var body, discount_code, cokitchen_polygon_id, meals, address, lat, lng, dealInDb, service_charge, cokitchenPolygonInDb, i, len, selected_meals, total_meal_amount, mealInDb, addons, addons_len, addonInDb, brand_found, _x3, _i, calculated_order;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body; // initialize the body variables

            discount_code = body.discount_code;
            cokitchen_polygon_id = body.cokitchen_polygon_id;
            meals = body.meals;
            address = body.address;
            lat = body.lat;
            lng = body.lng;
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
              _context2.next = 16;
              break;
            }

            _context2.next = 13;
            return _deal["default"].query().where({
              discount_code: discount_code
            }).withGraphFetched('[brand, deal_type, deal_requirement_type, deal_eligibility_type, deal_value_type]')["catch"](function () {
              return false;
            });

          case 13:
            dealInDb = _context2.sent;

            if (dealInDb) {
              _context2.next = 16;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)("deal not found for discount code:".concat(discount_code));

          case 16:
            _context2.next = 18;
            return _cokitchen_polygon["default"].query().where({
              id: cokitchen_polygon_id
            })["catch"](function () {
              return false;
            });

          case 18:
            cokitchenPolygonInDb = _context2.sent;

            if (cokitchenPolygonInDb) {
              _context2.next = 21;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)("cokitchen_polygon not found for id:".concat(cokitchen_polygon_id));

          case 21:
            //step 3- get all meals and addons from the db based on the request
            i = 0, len = meals.length;
            selected_meals = [];
            total_meal_amount = 0;

          case 24:
            if (!(i < len)) {
              _context2.next = 66;
              break;
            }

            _context2.next = 27;
            return _meal["default"].query().where({
              id: meals[i].id
            }).withGraphFetched('[brand]')["catch"](function () {
              return false;
            });

          case 27:
            mealInDb = _context2.sent;

            if (!mealInDb) {
              _context2.next = 62;
              break;
            }

            addons = [];

            if (!(meals[i].addons.length > 0)) {
              _context2.next = 46;
              break;
            }

            addons_len = meals[i].addons.length;

          case 32:
            if (!(j < addons_len)) {
              _context2.next = 46;
              break;
            }

            _context2.next = 35;
            return _addons["default"].query().where({
              id: meals[i].addons[j].id
            })["catch"](function () {
              return false;
            });

          case 35:
            addonInDb = _context2.sent;

            if (!addonInDb) {
              _context2.next = 42;
              break;
            }

            addonInDb.quantity = meals[i].addons[j].quantity;
            addonInDb.total_amount = meals[i].addons[j].quantity * addonInDb.amount;
            addons.push(addonInDb);
            _context2.next = 43;
            break;

          case 42:
            throw (0, _helpers.UnprocessableEntity)("addon not found meal-index:".concat(i, ", addon-index:").concat(j, " addon-id:").concat(meals[i].addons[j].id));

          case 43:
            j++;
            _context2.next = 32;
            break;

          case 46:
            mealInDb.addons = addons;
            mealInDb.quantity = meals[i].quantity;
            brand_found = false; // find the meals brand and push to that array

            _x3 = 0;

          case 50:
            if (!(_x3 < selected_meals.length)) {
              _context2.next = 59;
              break;
            }

            if (!(selected_meals[_x3].brand.id == mealInDb.brand.id)) {
              _context2.next = 56;
              break;
            }

            selected_meals[_x3].meals.push(mealInDb);

            selected_meals[_x3].amount += Number(mealInDb.amount) * mealInDb.quantity + mealInDb.addons.sum('total_amount');
            brand_found = true;
            return _context2.abrupt("break", 59);

          case 56:
            _x3++;
            _context2.next = 50;
            break;

          case 59:
            if (!brand_found) {
              selected_meals.push({
                brand: mealInDb.brand,
                meals: [mealInDb],
                amount: Number(mealInDb.amount) * mealInDb.quantity + mealInDb.addons.sum('total_amount')
              });
            }

            _context2.next = 63;
            break;

          case 62:
            throw (0, _helpers.UnprocessableEntity)("meal not found meal-index:".concat(i, " meal-id:").concat(meals[i].id));

          case 63:
            i++;
            _context2.next = 24;
            break;

          case 66:
            // if without deals meals amount is less than 2000, apply service charge
            if (selected_meals.sum('amount') < 2000) {
              service_charge = 60;
            } // 4- if deal exists , apply deal to amount


            if (!discount_code) {
              _context2.next = 84;
              break;
            }

            if (!(dealInDb.deal_type.name == 'BRAND')) {
              _context2.next = 80;
              break;
            }

            _i = 0;

          case 70:
            if (!(_i < selected_meals.length)) {
              _context2.next = 77;
              break;
            }

            if (!(selected_meals[x].brand.id == dealInDb.brand.id && dealInDb.min < selected_meals[x].amount)) {
              _context2.next = 74;
              break;
            }

            //apply deal
            selected_meals[x].amount -= selected_meals[x].amount * dealInDb.rate;
            return _context2.abrupt("break", 77);

          case 74:
            _i++;
            _context2.next = 70;
            break;

          case 77:
            total_meal_amount += selected_meals.sum('amount');
            _context2.next = 82;
            break;

          case 80:
            total_meal_amount += selected_meals.sum('amount');

            if (dealInDb.min < total_meal_amount) {
              //apply deal
              total_meal_amount -= total_meal_amount * dealInDb.rate;
            }

          case 82:
            _context2.next = 85;
            break;

          case 84:
            total_meal_amount += selected_meals.sum('amount');

          case 85:
            //5- service fee is applicable to orders of price less than NGN2000
            total_meal_amount += total_meal_amount + service_charge; //6 - add polygon delivery fee

            total_meal_amount += Number(cokitchenPolygonInDb.delivery_fee);
            _context2.next = 89;
            return _calculated_order["default"].query().insert({
              total_amount: total_meal_amount,
              service_charge: service_charge,
              delivery_fee: cokitchenPolygonInDb.delivery_fee,
              address: address,
              meals: selected_meals,
              cokitchen_polygon_id: cokitchen_polygon_id,
              deal_id: dealInDb.id,
              lat: lat,
              lng: lng
            })["catch"](function (e) {
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 89:
            calculated_order = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'order calulated successfully',
              calculated_order: calculated_order
            });

          case 91:
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
    var body, use_wallet, _yield$Promise$all, _yield$Promise$all2, orderTypeInDb, calculatedOrderInDb, order;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            order_details = JSON.stringify([]);

            if (body.order_details) {
              order_details = JSON.stringify(body.order_details);
            }

            use_wallet = false;

            if (body.use_wallet) {
              use_wallet = true;
            }

            _context3.next = 7;
            return Promise.all([_order_type["default"].query().findById(body.order_type_id)["catch"](function (e) {
              console.log(e);
              throw NotFound('Order type not found');
            }), _calculated_order["default"].query().findById(body.calculated_order_id)["catch"](function (e) {
              console.log(e);
              throw NotFound('Calculated order not found');
            })]);

          case 7:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            orderTypeInDb = _yield$Promise$all2[0];
            calculatedOrderInDb = _yield$Promise$all2[1];
            _context3.t0 = orderTypeInDb.name;
            _context3.next = _context3.t0 === 'WALLET' ? 14 : _context3.t0 === 'CARD' ? 15 : _context3.t0 === 'CASH' ? 16 : 20;
            break;

          case 14:
            return _context3.abrupt("break", 21);

          case 15:
            return _context3.abrupt("break", 21);

          case 16:
            _context3.next = 18;
            return _order["default"].query().insert({
              order_details: order_details,
              order_type_id: orderTypeInDb.id,
              calculated_order_id: calculatedOrderInDb.id
            })["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid order body');
            });

          case 18:
            order = _context3.sent;
            return _context3.abrupt("break", 21);

          case 20:
            throw NotFound('Not found');

          case 21:
            _context3.next = 23;
            return (0, _helpers.setPendingOrder)(order);

          case 23:
            return _context3.abrupt("return", {
              status: 'success',
              message: 'order created successfully',
              order: order
            });

          case 24:
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