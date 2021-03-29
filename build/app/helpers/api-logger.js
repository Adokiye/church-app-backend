"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiLogger = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _api_log = _interopRequireDefault(require("../models/api_log.js"));

var ApiLogger = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(third_party_details, third_party) {
    var third_party_config,
        third_party_action,
        third_party_personal_details,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            third_party_config = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            third_party_action = _args.length > 3 && _args[3] !== undefined ? _args[3] : '';
            third_party_personal_details = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};

            if (!(third_party_details.status === 200 || third_party_details.status)) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return _api_log["default"].query().insert({
              info: "Third party api call log for ".concat(third_party),
              type: third_party,
              api_data: third_party_details.metaData.details,
              successful: third_party_details.status === 200
            });

          case 6:
            return _context.abrupt("return");

          case 7:
            if (!(third_party === 'POSIST')) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return _api_log["default"].query().insert({
              info: "Third party api call log for ".concat(third_party),
              type: third_party,
              api_data: JSON.stringify(third_party_details),
              config: JSON.stringify(third_party_config),
              action: third_party_action,
              personal_details: third_party_personal_details,
              successful: third_party_details.success
            });

          case 10:
            return _context.abrupt("return");

          case 11:
            _context.next = 13;
            return _api_log["default"].query().insert({
              info: "Third party api call log for ".concat(third_party),
              type: third_party,
              api_data: JSON.stringify(third_party_details),
              successful: third_party_details.status
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ApiLogger(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.ApiLogger = ApiLogger;
//# sourceMappingURL=api-logger.js.map