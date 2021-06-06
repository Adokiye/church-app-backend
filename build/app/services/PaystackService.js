"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chargeCard = exports.handle = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

var _user_card = _interopRequireDefault(require("../models/user_card"));

var _order = require("../controllers/order.controller");

var _helpers = require("../helpers");

var _objection = require("objection");

var _TransactionService = require("./TransactionService");

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config");

/**
 * Handle Charge Success
 */
// paystack/webhook
var handle = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var _data$customer, email, phone_number, order, body, user, ctx;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _data$customer = data.customer, email = _data$customer.email, phone_number = _data$customer.phone_number, order = _data$customer.order, body = _data$customer.body; // get user details

            _context.next = 3;
            return _user["default"].query().where('phone_number', phone_number).limit(1).first()["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.NotFound)('User not found');
            });

          case 3:
            user = _context.sent;

            if (!order) {
              _context.next = 12;
              break;
            }

            if (!body.order_details.use_wallet) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return (0, _TransactionService.createTransactionForWallet)('Transfer', 'Debit', body.order_details.wallet_amount, user.id, "Order Payment of \u20A6".concat(body.order_details.wallet_amount, " by Wallet"), "Order Payment of \u20A6".concat(body.order_details.wallet_amount, " by Wallet"));

          case 8:
            _context.next = 10;
            return (0, _TransactionService.createTransactionForOrder)('Transfer', 'Debit', data.amount, user.id, "Order Payment of \u20A6".concat(data.amount, " by Card"), "Order Payment of \u20A6".concat(data.amount, " by Card"));

          case 10:
            _context.next = 14;
            break;

          case 12:
            _context.next = 14;
            return (0, _TransactionService.createTransactionForWallet)('Deposit', 'Credit', data.amount, user.id, "Deposit of \u20A6".concat(data.amount, " By Card"), "Deposit of \u20A6".concat(data.amount, " By Card"));

          case 14:
            console.log('before card'); // save card

            _context.next = 17;
            return _user_card["default"].query().insert({
              user_id: user.id,
              auth: data.authorization.authorization_code,
              last_four_digit: data.authorization.last4,
              status: true,
              country_code: data.authorization.country_code,
              expiry_month: data.authorization.exp_month,
              expiry_year: data.authorization.exp_year,
              signature: data.authorization.signature,
              bank: data.authorization.bank,
              reusable: data.authorization.reusable,
              card_name: data.authorization.card_type
            })["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 17:
            if (!order) {
              _context.next = 22;
              break;
            }

            ctx = {
              request: {
                body: body
              },
              state: {
                user: {
                  user: user
                }
              }
            };
            console.log(ctx);
            _context.next = 22;
            return (0, _order.createOrder)(ctx);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handle(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.handle = handle;

var chargeCard = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _axios["default"])({
              method: 'post',
              url: 'https://api.paystack.co/transaction/charge_authorization',
              data: data,
              headers: {
                Authorization: "Bearer ".concat(_config.PAYSTACK_SECRET),
                'Content-Type': 'application/json'
              }
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", {
              status: response.data.data.status,
              amount: response.data.data.amount,
              reference: response.data.data.reference,
              authorization: response.data.data.authorization
            });

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw (0, _helpers.UnprocessableEntity)(_context2.t0.response.data.message);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function chargeCard(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.chargeCard = chargeCard;
//# sourceMappingURL=PaystackService.js.map