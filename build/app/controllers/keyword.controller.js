"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllKeywords = exports.deleteMealAllergyMetadata = exports.createMealAllergyMetadata = exports.deleteMealDietaryMetadata = exports.createMealDietaryMetadata = exports.deleteMealTag = exports.createMealTag = exports.deleteMealKeyword = exports.createMealKeyword = exports.deleteMealDescriptiveMetadata = exports.createMealDescriptiveMetadata = exports.deleteMealBusinessMetadata = exports.createMealBusinessMetadata = exports.deleteBrandTag = exports.createBrandTag = exports.deleteBrandKeyword = exports.createBrandKeyword = exports.deleteBrandDescriptiveMetadata = exports.createBrandDescriptiveMetadata = exports.deleteBrandBusinessMetadata = exports.createBrandBusinessMetadata = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brand_descriptive_metadata = _interopRequireDefault(require("../models/brand_descriptive_metadata"));

var _brand_business_metadata = _interopRequireDefault(require("../models/brand_business_metadata"));

var _brand_keyword = _interopRequireDefault(require("../models/brand_keyword"));

var _brand_tag = _interopRequireDefault(require("../models/brand_tag"));

var _meal_descriptive_metadata = _interopRequireDefault(require("../models/meal_descriptive_metadata"));

var _meal_business_metadata = _interopRequireDefault(require("../models/meal_business_metadata"));

var _meal_keyword = _interopRequireDefault(require("../models/meal_keyword"));

var _meal_tag = _interopRequireDefault(require("../models/meal_tag"));

var _meal_allergy_metadata = _interopRequireDefault(require("../models/meal_allergy_metadata"));

var _meal_dietary_metadata = _interopRequireDefault(require("../models/meal_dietary_metadata"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createBrandBusinessMetadata = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx) {
    var body, role, brand_business_metadata_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context.sent) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return _brand_business_metadata["default"].query().insert(body);

          case 7:
            brand_business_metadata_data = _context.sent;
            return _context.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand Business metadata Created Successfully'
            }, brand_business_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createBrandBusinessMetadata(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createBrandBusinessMetadata = createBrandBusinessMetadata;

var deleteBrandBusinessMetadata = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, brand_business_metadata_data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context2.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context2.sent) {
              _context2.next = 11;
              break;
            }

            _context2.next = 7;
            return _brand_business_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Brand Business Metadata not found');
            });

          case 7:
            brand_business_metadata_data = _context2.sent;
            return _context2.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand business metadata Deleted Successfully'
            }, brand_business_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteBrandBusinessMetadata(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteBrandBusinessMetadata = deleteBrandBusinessMetadata;

var createBrandDescriptiveMetadata = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, role, brand_descriptive_metadata_data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context3.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context3.sent) {
              _context3.next = 11;
              break;
            }

            _context3.next = 7;
            return _brand_descriptive_metadata["default"].query().insert(body);

          case 7:
            brand_descriptive_metadata_data = _context3.sent;
            return _context3.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand descriptive metadata Created Successfully'
            }, brand_descriptive_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createBrandDescriptiveMetadata(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createBrandDescriptiveMetadata = createBrandDescriptiveMetadata;

var deleteBrandDescriptiveMetadata = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var body, role, brand_descriptive_metadata_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context4.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context4.sent) {
              _context4.next = 11;
              break;
            }

            _context4.next = 7;
            return _brand_descriptive_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Brand descriptive Metadata not found');
            });

          case 7:
            brand_descriptive_metadata_data = _context4.sent;
            return _context4.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand descriptive metadata Deleted Successfully'
            }, brand_descriptive_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteBrandDescriptiveMetadata(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteBrandDescriptiveMetadata = deleteBrandDescriptiveMetadata;

var createBrandKeyword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var body, role, brand_keyword_data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context5.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context5.sent) {
              _context5.next = 11;
              break;
            }

            _context5.next = 7;
            return _brand_keyword["default"].query().insert(body);

          case 7:
            brand_keyword_data = _context5.sent;
            return _context5.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand keyword Created Successfully'
            }, brand_keyword_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createBrandKeyword(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createBrandKeyword = createBrandKeyword;

var deleteBrandKeyword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var body, role, brand_keyword_data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context6.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context6.sent) {
              _context6.next = 11;
              break;
            }

            _context6.next = 7;
            return _brand_keyword["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Brand keyword not found');
            });

          case 7:
            brand_keyword_data = _context6.sent;
            return _context6.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand keyword Deleted Successfully'
            }, brand_keyword_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteBrandKeyword(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteBrandKeyword = deleteBrandKeyword;

var createBrandTag = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx) {
    var body, role, brand_tag_data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context7.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context7.sent) {
              _context7.next = 11;
              break;
            }

            _context7.next = 7;
            return _brand_tag["default"].query().insert(body);

          case 7:
            brand_tag_data = _context7.sent;
            return _context7.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand tag Created Successfully'
            }, brand_tag_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function createBrandTag(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.createBrandTag = createBrandTag;

var deleteBrandTag = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(ctx) {
    var body, role, brand_tag_data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context8.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context8.sent) {
              _context8.next = 11;
              break;
            }

            _context8.next = 7;
            return _brand_tag["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Brand tag not found');
            });

          case 7:
            brand_tag_data = _context8.sent;
            return _context8.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand tag Deleted Successfully'
            }, brand_tag_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function deleteBrandTag(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.deleteBrandTag = deleteBrandTag;

var createMealBusinessMetadata = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(ctx) {
    var body, role, meal_business_metadata_data;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context9.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context9.sent) {
              _context9.next = 11;
              break;
            }

            _context9.next = 7;
            return _meal_business_metadata["default"].query().insert(body);

          case 7:
            meal_business_metadata_data = _context9.sent;
            return _context9.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Mealbusinessmetadata Created Successfully'
            }, meal_business_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function createMealBusinessMetadata(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createMealBusinessMetadata = createMealBusinessMetadata;

var deleteMealBusinessMetadata = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(ctx) {
    var body, role, meal_business_metadata_data;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context10.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context10.sent) {
              _context10.next = 11;
              break;
            }

            _context10.next = 7;
            return _meal_business_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal Business Metadata not found');
            });

          case 7:
            meal_business_metadata_data = _context10.sent;
            return _context10.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Brand business metadata Deleted Successfully'
            }, meal_business_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteMealBusinessMetadata(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteMealBusinessMetadata = deleteMealBusinessMetadata;

var createMealDescriptiveMetadata = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(ctx) {
    var body, role, meal_descriptive_metadata_data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context11.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context11.sent) {
              _context11.next = 11;
              break;
            }

            _context11.next = 7;
            return _meal_descriptive_metadata["default"].query().insert(body);

          case 7:
            meal_descriptive_metadata_data = _context11.sent;
            return _context11.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal descriptive metadata Created Successfully'
            }, meal_descriptive_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function createMealDescriptiveMetadata(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

exports.createMealDescriptiveMetadata = createMealDescriptiveMetadata;

var deleteMealDescriptiveMetadata = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(ctx) {
    var body, role, meal_descriptive_metadata_data;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context12.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context12.sent) {
              _context12.next = 11;
              break;
            }

            _context12.next = 7;
            return _meal_descriptive_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal descriptive Metadata not found');
            });

          case 7:
            meal_descriptive_metadata_data = _context12.sent;
            return _context12.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal descriptive metadata Deleted Successfully'
            }, meal_descriptive_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function deleteMealDescriptiveMetadata(_x12) {
    return _ref12.apply(this, arguments);
  };
}();

exports.deleteMealDescriptiveMetadata = deleteMealDescriptiveMetadata;

var createMealKeyword = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(ctx) {
    var body, role, meal_keyword_data;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context13.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context13.sent) {
              _context13.next = 11;
              break;
            }

            _context13.next = 7;
            return _meal_keyword["default"].query().insert(body);

          case 7:
            meal_keyword_data = _context13.sent;
            return _context13.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal keyword Created Successfully'
            }, meal_keyword_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function createMealKeyword(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

exports.createMealKeyword = createMealKeyword;

var deleteMealKeyword = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(ctx) {
    var body, role, meal_keyword_data;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context14.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context14.sent) {
              _context14.next = 11;
              break;
            }

            _context14.next = 7;
            return _meal_keyword["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal keyword not found');
            });

          case 7:
            meal_keyword_data = _context14.sent;
            return _context14.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal keyword Deleted Successfully'
            }, meal_keyword_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function deleteMealKeyword(_x14) {
    return _ref14.apply(this, arguments);
  };
}();

exports.deleteMealKeyword = deleteMealKeyword;

var createMealTag = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(ctx) {
    var body, role, meal_tag_data;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context15.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context15.sent) {
              _context15.next = 11;
              break;
            }

            _context15.next = 7;
            return _meal_tag["default"].query().insert(body);

          case 7:
            meal_tag_data = _context15.sent;
            return _context15.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal tag Created Successfully'
            }, meal_tag_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function createMealTag(_x15) {
    return _ref15.apply(this, arguments);
  };
}();

exports.createMealTag = createMealTag;

var deleteMealTag = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(ctx) {
    var body, role, meal_tag_data;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context16.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context16.sent) {
              _context16.next = 11;
              break;
            }

            _context16.next = 7;
            return _meal_tag["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal tag not found');
            });

          case 7:
            meal_tag_data = _context16.sent;
            return _context16.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal tag Deleted Successfully'
            }, meal_tag_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function deleteMealTag(_x16) {
    return _ref16.apply(this, arguments);
  };
}();

exports.deleteMealTag = deleteMealTag;

var createMealDietaryMetadata = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(ctx) {
    var body, role, meal_dietary_metadata_data;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context17.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context17.sent) {
              _context17.next = 11;
              break;
            }

            _context17.next = 7;
            return _meal_dietary_metadata["default"].query().insert(body);

          case 7:
            meal_dietary_metadata_data = _context17.sent;
            return _context17.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal dietary metadata Created Successfully'
            }, meal_dietary_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function createMealDietaryMetadata(_x17) {
    return _ref17.apply(this, arguments);
  };
}();

exports.createMealDietaryMetadata = createMealDietaryMetadata;

var deleteMealDietaryMetadata = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(ctx) {
    var body, role, meal_dietary_metadata_data;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context18.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context18.sent) {
              _context18.next = 11;
              break;
            }

            _context18.next = 7;
            return _meal_dietary_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal tag not found');
            });

          case 7:
            meal_dietary_metadata_data = _context18.sent;
            return _context18.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal allegy metadata Deleted Successfully'
            }, meal_dietary_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function deleteMealDietaryMetadata(_x18) {
    return _ref18.apply(this, arguments);
  };
}();

exports.deleteMealDietaryMetadata = deleteMealDietaryMetadata;

var createMealAllergyMetadata = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(ctx) {
    var body, role, meal_allergy_metadata_data;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context19.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context19.sent) {
              _context19.next = 11;
              break;
            }

            _context19.next = 7;
            return _meal_allergy_metadata["default"].query().insert(body);

          case 7:
            meal_allergy_metadata_data = _context19.sent;
            return _context19.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal allergy metadata Created Successfully'
            }, meal_allergy_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));

  return function createMealAllergyMetadata(_x19) {
    return _ref19.apply(this, arguments);
  };
}();

exports.createMealAllergyMetadata = createMealAllergyMetadata;

var deleteMealAllergyMetadata = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(ctx) {
    var body, role, meal_allergy_metadata_data;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context20.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context20.sent) {
              _context20.next = 11;
              break;
            }

            _context20.next = 7;
            return _meal_allergy_metadata["default"].query().deleteById(body.id)["catch"](function () {
              throw (0, _helpers.NotFound)('Meal tag not found');
            });

          case 7:
            meal_allergy_metadata_data = _context20.sent;
            return _context20.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Meal allegy metadata Deleted Successfully'
            }, meal_allergy_metadata_data));

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized Creation');

          case 12:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));

  return function deleteMealAllergyMetadata(_x20) {
    return _ref20.apply(this, arguments);
  };
}();

exports.deleteMealAllergyMetadata = deleteMealAllergyMetadata;

var getAllKeywords = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(ctx) {
    var body, role, _yield$Promise$all, _yield$Promise$all2, meal_allergy_metadata, meal_business_metadata, meal_descriptive_metadata, meal_dietary_metadata, meal_tag, meal_keyword, brand_keyword, brand_tag, brand_descriptive_metadata, brand_business_metadata;

    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context21.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context21.sent) {
              _context21.next = 22;
              break;
            }

            _context21.next = 7;
            return Promise.all([_meal_allergy_metadata["default"].query(), _meal_business_metadata["default"].query(), _meal_descriptive_metadata["default"].query(), _meal_dietary_metadata["default"].query(), _meal_tag["default"].query(), _meal_keyword["default"].query(), _brand_keyword["default"].query(), _brand_tag["default"].query(), _brand_descriptive_metadata["default"].query(), _brand_business_metadata["default"].query()]);

          case 7:
            _yield$Promise$all = _context21.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 10);
            meal_allergy_metadata = _yield$Promise$all2[0];
            meal_business_metadata = _yield$Promise$all2[1];
            meal_descriptive_metadata = _yield$Promise$all2[2];
            meal_dietary_metadata = _yield$Promise$all2[3];
            meal_tag = _yield$Promise$all2[4];
            meal_keyword = _yield$Promise$all2[5];
            brand_keyword = _yield$Promise$all2[6];
            brand_tag = _yield$Promise$all2[7];
            brand_descriptive_metadata = _yield$Promise$all2[8];
            brand_business_metadata = _yield$Promise$all2[9];
            return _context21.abrupt("return", {
              status: 'success',
              message: 'Success!',
              meal_allergy_metadata: meal_allergy_metadata,
              meal_business_metadata: meal_business_metadata,
              meal_descriptive_metadata: meal_descriptive_metadata,
              meal_dietary_metadata: meal_dietary_metadata,
              meal_tag: meal_tag,
              meal_keyword: meal_keyword,
              brand_keyword: brand_keyword,
              brand_tag: brand_tag,
              brand_descriptive_metadata: brand_descriptive_metadata,
              brand_business_metadata: brand_business_metadata
            });

          case 22:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 23:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));

  return function getAllKeywords(_x21) {
    return _ref21.apply(this, arguments);
  };
}();

exports.getAllKeywords = getAllKeywords;
//# sourceMappingURL=keyword.controller.js.map