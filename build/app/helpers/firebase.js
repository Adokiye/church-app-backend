"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPendingOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _path = _interopRequireDefault(require("path"));

var serviceAccount = _path["default"].join(__dirname, 'cokitchen-312312-d3cc6d60550e.json');

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(serviceAccount)
});

var db = _firebaseAdmin["default"].firestore();

var pendingOrdersDb = db.collection('pending_orders');

var setPendingOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(order) {
    var new_pending_order;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            new_pending_order = pendingOrdersDb.doc(order.id);
            _context.next = 3;
            return new_pending_order.set(order);

          case 3:
            return _context.abrupt("return", true);

          case 4:
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
//# sourceMappingURL=firebase.js.map