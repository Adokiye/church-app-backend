"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFaq = exports.updateFaqArrangement = exports.updateFaq = exports.addNewFaq = exports.getFaqArrangement = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user_setting = _interopRequireDefault(require("../models/user_setting"));

var _user_saved_address = _interopRequireDefault(require("../models/user_saved_address"));

var _faq_arrangement = _interopRequireDefault(require("../models/faq_arrangement"));

var _faq = _interopRequireDefault(require("../models/faq"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getFaqArrangement = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var user, faq_arrangement_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = ctx.state.user.user;
            _context.next = 3;
            return _faq_arrangement["default"].query()["catch"](function () {
              return false;
            });

          case 3:
            faq_arrangement_data = _context.sent;

            if (faq_arrangement_data) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              status: 'success',
              message: "Faq's Arrangement data returned Successfully",
              data: []
            });

          case 8:
            return _context.abrupt("return", {
              status: 'success',
              message: "Faq's Arrangement data returned Successfully",
              data: faq_arrangement_data[0].faqs
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getFaqArrangement(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getFaqArrangement = getFaqArrangement;

var addNewFaq = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var role, body, faq, faq_arrangement_data, faqs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            role = ctx.state.user.user.role;
            body = ctx.request.body;
            _context2.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context2.sent) {
              _context2.next = 30;
              break;
            }

            _context2.next = 7;
            return _faq["default"].query().insert(body);

          case 7:
            faq = _context2.sent;
            _context2.next = 10;
            return _faq_arrangement["default"].query()["catch"](function () {
              return false;
            });

          case 10:
            faq_arrangement_data = _context2.sent;

            if (faq_arrangement_data) {
              _context2.next = 21;
              break;
            }

            faqs = [];
            faqs.push(faq);
            console.log(faq);
            _context2.next = 17;
            return _faq_arrangement["default"].query().insert({
              faqs: JSON.stringify(faqs)
            })["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('invalid data');
            });

          case 17:
            faq_arrangement_data = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: "Faq's Arrangement data returned Successfully",
              data: faq_arrangement_data.faqs
            });

          case 21:
            console.log(faq_arrangement_data[0]);
            faq_arrangement_data[0].faqs.push(faq);
            faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs);
            _context2.next = 26;
            return _faq_arrangement["default"].query().patchAndFetchById(faq_arrangement_data[0].id, faq_arrangement_data[0]);

          case 26:
            faq_arrangement_data = _context2.sent;
            return _context2.abrupt("return", {
              status: 'success',
              message: 'Faq data added Successfully',
              data: faq_arrangement_data.faqs
            });

          case 28:
            _context2.next = 31;
            break;

          case 30:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addNewFaq(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addNewFaq = addNewFaq;

var updateFaq = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var role, body, faq_id, faq_data, faq_arrangement_data, foundIndex;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            role = ctx.state.user.user.role;
            body = ctx.request.body;
            _context3.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context3.sent) {
              _context3.next = 26;
              break;
            }

            faq_id = body.faq_id;
            delete body.faq_id;
            _context3.next = 9;
            return _faq["default"].query().patchAndFetchById(faq_id, body)["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 9:
            faq_data = _context3.sent;

            if (faq_data) {
              _context3.next = 14;
              break;
            }

            throw (0, _helpers.NotFound)('Faq data not found.');

          case 14:
            _context3.next = 16;
            return _faq_arrangement["default"].query()["catch"](function () {
              return false;
            });

          case 16:
            faq_arrangement_data = _context3.sent;
            foundIndex = faq_arrangement_data[0].faqs.findIndex(function (faq) {
              return faq.id == faq_id;
            });
            faq_arrangement_data[0].faqs[foundIndex] = faq_data;
            faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs);
            _context3.next = 22;
            return _faq_arrangement["default"].query().patchAndFetchById(faq_arrangement_data[0].id, faq_arrangement_data[0]);

          case 22:
            faq_arrangement_data = _context3.sent;
            return _context3.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Faq updated Successfully'
            }, faq_data));

          case 24:
            _context3.next = 27;
            break;

          case 26:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateFaq(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateFaq = updateFaq;

var updateFaqArrangement = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var role, body, faq_arrangement, faq_arrangement_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            role = ctx.state.user.user.role;
            body = ctx.request.body;
            _context4.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context4.sent) {
              _context4.next = 17;
              break;
            }

            faq_arrangement = body.faq_arrangement;
            _context4.next = 8;
            return _faq_arrangement["default"].query()["catch"](function () {
              return false;
            });

          case 8:
            faq_arrangement_data = _context4.sent;
            faq_arrangement_data[0].faqs = faq_arrangement;
            faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs);
            _context4.next = 13;
            return _faq_arrangement["default"].query().patchAndFetchById(faq_arrangement_data[0].id, faq_arrangement_data[0]);

          case 13:
            faq_arrangement_data = _context4.sent;
            return _context4.abrupt("return", {
              status: 'success',
              message: 'Faq updated Successfully',
              data: faq_arrangement_data.faqs
            });

          case 17:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateFaqArrangement(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateFaqArrangement = updateFaqArrangement;

var deleteFaq = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var role, params, faq_arrangement_data, foundIndex, faq_data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            role = ctx.state.user.user.role;
            params = ctx.params;
            _context5.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context5.sent) {
              _context5.next = 22;
              break;
            }

            _context5.next = 7;
            return _faq_arrangement["default"].query()["catch"](function () {
              return [];
            });

          case 7:
            faq_arrangement_data = _context5.sent;
            foundIndex = faq_arrangement_data[0].faqs.findIndex(function (faq) {
              return faq != null && faq.id == params.id;
            });
            console.log(foundIndex);
            delete faq_arrangement_data[0].faqs.splice(foundIndex, 1);
            console.log(faq_arrangement_data);
            faq_arrangement_data[0].faqs = JSON.stringify(faq_arrangement_data[0].faqs);
            _context5.next = 15;
            return _faq_arrangement["default"].query().patchAndFetchById(faq_arrangement_data[0].id, faq_arrangement_data[0])["catch"](function () {
              throw (0, _helpers.NotFound)('Faq not found');
            });

          case 15:
            faq_arrangement_data = _context5.sent;
            _context5.next = 18;
            return _faq["default"].query().deleteById(params.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Faq with id ' + params.id + ' not found');
            });

          case 18:
            faq_data = _context5.sent;
            return _context5.abrupt("return", {
              status: 'success',
              message: 'Faq Deleted Successfully'
            });

          case 22:
            throw (0, _helpers.Unauthorized)('Unauthorized Delete');

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteFaq(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteFaq = deleteFaq;
//# sourceMappingURL=faq.controller.js.map