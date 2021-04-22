"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seed = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var seed = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(knex) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return knex('cokitchens').del();

          case 2:
            _context.next = 4;
            return knex('cokitchens').insert([{
              id: (0, _uuid.v4)(),
              name: 'CoKitchen Lekki',
              lat: '6.466100',
              lng: '3.539190',
              address: 'Close 57 Victoria Garden City Lagos'
            }]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function seed(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.seed = seed;
//# sourceMappingURL=cokitchen.js.map