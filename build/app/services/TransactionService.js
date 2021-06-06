"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransactionForOrder = exports.createTransactionForWallet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _transaction = _interopRequireDefault(require("../models/transaction"));

var _objection = require("objection");

var _user = _interopRequireDefault(require("../models/user"));

var _helpers = require("../helpers");

var transaction_types = ['Deposit', 'Transfer', 'Withdraw'];
var transaction_actions = ['Credit', 'Debit'];

var createTransactionForWallet = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transaction_type, transaction_action, amount, user_id, description, reason) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _objection.transaction)(_transaction["default"], _user["default"], /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(Transaction, User) {
                var user, balance, _yield$Promise$all, _yield$Promise$all2, transaction_data, user_data;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return User.query().findById(user_id)["catch"](function (e) {
                          console.log(e);
                          throw (0, _helpers.UnprocessableEntity)('Invalid Body');
                        });

                      case 2:
                        user = _context.sent;
                        balance = Number(user.balance);
                        _context.t0 = transaction_action;
                        _context.next = _context.t0 === 'Debit' ? 7 : _context.t0 === 'Credit' ? 9 : 11;
                        break;

                      case 7:
                        balance -= Number(amount);
                        return _context.abrupt("break", 12);

                      case 9:
                        balance += Number(amount);
                        return _context.abrupt("break", 12);

                      case 11:
                        throw (0, _helpers.UnprocessableEntity)('Invalid Transaction Action');

                      case 12:
                        _context.next = 14;
                        return Promise.all([Transaction.query().insert({
                          amount: amount,
                          user_id: user.id,
                          transaction_type: transaction_type,
                          transaction_action: transaction_action,
                          transaction_status: 'Success',
                          description: description,
                          reason: reason
                        })["catch"](function (e) {
                          console.log(e);
                          throw (0, _helpers.UnprocessableEntity)('Invalid Transaction body');
                        }), User.query().patchAndFetchById(user.id, {
                          balance: balance.toString()
                        })["catch"](function (e) {
                          console.log(e);
                          throw (0, _helpers.UnprocessableEntity)('Invalid User body');
                        })]);

                      case 14:
                        _yield$Promise$all = _context.sent;
                        _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
                        transaction_data = _yield$Promise$all2[0];
                        user_data = _yield$Promise$all2[1];
                        return _context.abrupt("return", {
                          transaction_data: transaction_data,
                          user_data: user_data
                        });

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createTransactionForWallet(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTransactionForWallet = createTransactionForWallet;

var createTransactionForOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(transaction_type, transaction_action, amount, user_id, description, reason) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _objection.transaction)(_transaction["default"], _user["default"], /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(Transaction, User) {
                var user, balance, _yield$Promise$all3, _yield$Promise$all4, transaction_data;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return User.query().findById(user_id)["catch"](function (e) {
                          console.log(e);
                          throw (0, _helpers.UnprocessableEntity)('Invalid Body');
                        });

                      case 2:
                        user = _context3.sent;
                        balance = Number(user.balance);
                        _context3.t0 = transaction_action;
                        _context3.next = _context3.t0 === 'Debit' ? 7 : _context3.t0 === 'Credit' ? 9 : 11;
                        break;

                      case 7:
                        balance -= Number(amount);
                        return _context3.abrupt("break", 12);

                      case 9:
                        balance += Number(amount);
                        return _context3.abrupt("break", 12);

                      case 11:
                        throw (0, _helpers.UnprocessableEntity)('Invalid Transaction Action');

                      case 12:
                        _context3.next = 14;
                        return Promise.all([Transaction.query().insert({
                          amount: amount,
                          user_id: user.id,
                          transaction_type: transaction_type,
                          transaction_action: transaction_action,
                          transaction_status: 'Success',
                          description: description,
                          reason: reason
                        })["catch"](function (e) {
                          console.log(e);
                          throw (0, _helpers.UnprocessableEntity)('Invalid Transaction body');
                        })]);

                      case 14:
                        _yield$Promise$all3 = _context3.sent;
                        _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 1);
                        transaction_data = _yield$Promise$all4[0];
                        return _context3.abrupt("return", {
                          transaction_data: transaction_data
                        });

                      case 18:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x15, _x16) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createTransactionForOrder(_x9, _x10, _x11, _x12, _x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createTransactionForOrder = createTransactionForOrder;
//# sourceMappingURL=TransactionService.js.map