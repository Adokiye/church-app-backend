"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosistBrandMenu = void 0;

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
//# sourceMappingURL=posist.js.map