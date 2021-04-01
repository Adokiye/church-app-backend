"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.updateNewUserService = exports.newCustomerService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objection = require("objection");

var _user = _interopRequireDefault(require("../models/user"));

var _role = _interopRequireDefault(require("../models/role"));

var _free_delivery = _interopRequireDefault(require("../models/free_delivery"));

var _user_setting = _interopRequireDefault(require("../models/user_setting"));

var _referral_code = _interopRequireDefault(require("../models/referral_code"));

var _helpers = require("../helpers");

var newCustomerService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(phone_number) {
    var _yield$Promise$all, _yield$Promise$all2, user, _yield$Promise$all3, _yield$Promise$all4, free_delivery, user_setting, referral_code;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([_user["default"].query().insert({
              phone_number: phone_number,
              role: 'CUSTOMER',
              active: true
            })]);

          case 2:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 1);
            user = _yield$Promise$all2[0];
            _context.next = 7;
            return Promise.all([_free_delivery["default"].query().insert({
              user_id: user.id
            }), _user_setting["default"].query().insert({
              user_id: user.id
            }), _referral_code["default"].query().insert({
              user_id: user.id,
              code: (0, _helpers.makeCode)(6).toUpperCase()
            })]);

          case 7:
            _yield$Promise$all3 = _context.sent;
            _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 3);
            free_delivery = _yield$Promise$all4[0];
            user_setting = _yield$Promise$all4[1];
            referral_code = _yield$Promise$all4[2];
            return _context.abrupt("return", {
              user: user
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newCustomerService(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.newCustomerService = newCustomerService;

var updateNewUserService = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(personal_details, user) {
    var user_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!personal_details.password) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return (0, _helpers.encryptPassword)(personal_details.password);

          case 3:
            personal_details.password = _context2.sent;

          case 4:
            _context2.next = 6;
            return _user["default"].query().patchAndFetchById(user.id, personal_details);

          case 6:
            user_data = _context2.sent;
            return _context2.abrupt("return", {
              user_data: user_data
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateNewUserService(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateNewUserService = updateNewUserService;
var _default = {
  newCustomerService: newCustomerService,
  updateNewUserService: updateNewUserService
};
exports["default"] = _default;
//# sourceMappingURL=UserService.js.map