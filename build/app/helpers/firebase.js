"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTrackingOrder = exports.deletePendingOrder = exports.setPendingOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _path = _interopRequireDefault(require("path"));

var _cokitchen312312D3cc6d60550e = _interopRequireDefault(require("./cokitchen-312312-d3cc6d60550e.json"));

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(_cokitchen312312D3cc6d60550e["default"])
});

var db = _firebaseAdmin["default"].firestore();

var pendingOrdersDb = db.collection('pending_orders');
var trackingOrdersDb = db.collection('tracking_orders');

var setPendingOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(order) {
    var new_pending_order;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            new_pending_order = pendingOrdersDb.doc(order.id);
            console.log(order);
            _context.next = 4;
            return new_pending_order.set(JSON.parse(JSON.stringify(order)));

          case 4:
            return _context.abrupt("return", true);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setPendingOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.setPendingOrder = setPendingOrder;

var deletePendingOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(order) {
    var new_pending_order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            new_pending_order = pendingOrdersDb.doc(order.id);
            console.log(order);
            _context2.next = 4;
            return new_pending_order["delete"]();

          case 4:
            return _context2.abrupt("return", true);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deletePendingOrder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deletePendingOrder = deletePendingOrder;

var setTrackingOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    var new_tracking_order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            new_tracking_order = trackingOrdersDb.doc(data.id);
            new_tracking_order.get().then( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(thisDoc) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!thisDoc.exists) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 3;
                        return new_tracking_order.update(JSON.parse(JSON.stringify(data)));

                      case 3:
                        _context3.next = 8;
                        break;

                      case 5:
                        console.log('not exists');
                        _context3.next = 8;
                        return new_tracking_order.set(JSON.parse(JSON.stringify(data)));

                      case 8:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }());
            return _context4.abrupt("return", true);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function setTrackingOrder(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setTrackingOrder = setTrackingOrder;
//# sourceMappingURL=firebase.js.map