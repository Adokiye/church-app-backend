"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPosistOrder = exports.getPosistBrandMenu = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _config = require("../config.js");

var getPosistBrandMenu = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(customerKey) {
    var sub_url, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sub_url = 'online_order_cloud/menu';
            console.log(_config.POSIST_API_URL + sub_url + '?customer_key=' + customerKey);
            _context.next = 4;
            return _axios["default"].get(_config.POSIST_API_URL + sub_url + '?customer_key=' + customerKey, {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + _config.POSIST_TOKEN
              }
            });

          case 4:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPosistBrandMenu(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPosistBrandMenu = getPosistBrandMenu;

var createPosistOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data, customerKey) {
    var sub_url, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sub_url = 'online_order_cloud/push';
            console.log(_config.POSIST_API_URL + sub_url + '?customer_key=' + customerKey);
            data.source.name = _config.POSIST_CLIENT_NAME;
            data.source.id = _config.POSIST_CLIENT_ID;
            console.log(data);
            _context2.next = 7;
            return _axios["default"].post(_config.POSIST_API_URL + sub_url + '?customer_key=' + customerKey, data, {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + _config.POSIST_TOKEN
              }
            });

          case 7:
            response = _context2.sent;
            console.log(response);
            return _context2.abrupt("return", response);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createPosistOrder(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createPosistOrder = createPosistOrder;
//# sourceMappingURL=posist.js.map