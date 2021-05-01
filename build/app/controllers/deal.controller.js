"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostsArrangement = exports.getCokitchenHomePagePosts = exports.getCokitchenDeals = exports.getDealTypes = exports.updateDeal = exports.createPost = exports.createDeal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _brand = _interopRequireDefault(require("../models/brand"));

var _deal = _interopRequireDefault(require("../models/deal"));

var _posts = _interopRequireDefault(require("../models/posts"));

var _deal_type = _interopRequireDefault(require("../models/deal_type"));

var _deal_eligibility_type = _interopRequireDefault(require("../models/deal_eligibility_type"));

var _deal_requirement_type = _interopRequireDefault(require("../models/deal_requirement_type"));

var _deal_value_type = _interopRequireDefault(require("../models/deal_value_type"));

var _cokitchen = _interopRequireDefault(require("../models/cokitchen"));

var _cokitchen_home_page_post = _interopRequireDefault(require("../models/cokitchen_home_page_post"));

var _RoleService = require("../services/RoleService");

var _helpers = require("../helpers");

var _PostService = require("../services/PostService");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createDeal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var body, role, post, _yield$Promise$all, _yield$Promise$all2, deal_type_data, deal_eligibility_type_data, deal_value_type_data, deal_requirement_type_data, deals, i, len, _ret, deal_data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            post = false;

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            if (body.post) {
              post = body.post;
              delete body.post;
            }

            _context2.next = 7;
            return (0, _RoleService.checkIfMarketing)(role);

          case 7:
            if (!_context2.sent) {
              _context2.next = 64;
              break;
            }

            _context2.next = 10;
            return Promise.all([_deal_type["default"].query().findById(body.deal_type_id)["catch"](function (e) {
              return false;
            }), _deal_eligibility_type["default"].query().findById(body.deal_eligibility_type_id)["catch"](function (e) {
              return false;
            }), _deal_value_type["default"].query().findById(body.deal_value_type_id)["catch"](function (e) {
              return false;
            }), _deal_requirement_type["default"].query().findById(body.deal_requirement_type_id)["catch"](function (e) {
              return false;
            })]);

          case 10:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 4);
            deal_type_data = _yield$Promise$all2[0];
            deal_eligibility_type_data = _yield$Promise$all2[1];
            deal_value_type_data = _yield$Promise$all2[2];
            deal_requirement_type_data = _yield$Promise$all2[3];

            if (deal_type_data) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_type: ['Deal type not found with that id']
              }
            }));

          case 18:
            if (deal_eligibility_type_data) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_eligibility_type: ['Deal Eligibility type not found with that id']
              }
            }));

          case 20:
            if (deal_value_type_data) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_value_type: ['Deal Value type not found with that id']
              }
            }));

          case 22:
            if (deal_requirement_type_data) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              status: 'error',
              message: 'Not Found',
              errors: {
                deal_requirement_type: ['Deal Value type not found with that id']
              }
            }));

          case 24:
            if (!(deal_eligibility_type_data.name === 'SPECIFIC_CUSTOMERS')) {
              _context2.next = 28;
              break;
            }

            if (body.specific_customers) {
              _context2.next = 27;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('For eligibility type SPECIFIC_CUSTOMERS, specific_customers array is required');

          case 27:
            body.specific_customers = JSON.stringify(body.specific_customers);

          case 28:
            _context2.t0 = deal_requirement_type_data.name;
            _context2.next = _context2.t0 === 'MINIMUM_PURCHASE_AMOUNT' ? 31 : _context2.t0 === 'MINIMUM_QUANTITY_OF_ITEMS' ? 34 : 37;
            break;

          case 31:
            if (body.min_amount) {
              _context2.next = 33;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('For requirement type MINIMUM_PURCHASE_AMOUNT, min_amount is required');

          case 33:
            return _context2.abrupt("break", 37);

          case 34:
            if (body.min_items) {
              _context2.next = 36;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('For requirement type MINIMUM_QUANTITY_OF_ITEMS, min_items is required');

          case 36:
            return _context2.abrupt("break", 37);

          case 37:
            _context2.t1 = deal_value_type_data.name;
            _context2.next = _context2.t1 === 'PERCENTAGE' ? 40 : _context2.t1 === 'FIXED_AMOUNT' ? 43 : 46;
            break;

          case 40:
            if (body.rate) {
              _context2.next = 42;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('For value type PERCENTAGE, rate is required');

          case 42:
            return _context2.abrupt("break", 46);

          case 43:
            if (body.fixed_amount) {
              _context2.next = 45;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('For value type FIXED_AMOUNT, fixed_amount is required');

          case 45:
            return _context2.abrupt("break", 46);

          case 46:
            if (!(deal_type_data.name === 'BRAND')) {
              _context2.next = 53;
              break;
            }

            return _context2.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var brands, brand_data, deal_data;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (body.brands) {
                        _context.next = 2;
                        break;
                      }

                      throw (0, _helpers.UnprocessableEntity)('for deal type BRAND, brands array is required');

                    case 2:
                      brands = body.brands;
                      delete body.brands;
                      deals = [];
                      i = 0;
                      len = brands.length;

                    case 7:
                      if (!(i < len)) {
                        _context.next = 14;
                        break;
                      }

                      _context.next = 10;
                      return _brand["default"].query().where('id', brands[i].id)["catch"](function (e) {
                        console.log(e);
                        throw (0, _helpers.UnprocessableEntity)('Brand not found for id:' + brands[i].id);
                      });

                    case 10:
                      brand_data = _context.sent;
                      i++;
                      _context.next = 7;
                      break;

                    case 14:
                      body.cokitchen_id = brands[0].cokitchen_id;
                      body.brands = JSON.stringify(body.brands);
                      _context.next = 18;
                      return _deal["default"].query().insert(body)["catch"](function (e) {
                        console.log(e);
                        throw (0, _helpers.UnprocessableEntity)('Invalid Body');
                      });

                    case 18:
                      deal_data = _context.sent;

                      if (!post) {
                        _context.next = 22;
                        break;
                      }

                      _context.next = 22;
                      return (0, _PostService.newPost)(deal_data);

                    case 22:
                      return _context.abrupt("return", {
                        v: {
                          status: 'success',
                          message: 'Deal Creation Successful',
                          data: deal_data
                        }
                      });

                    case 23:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })(), "t2", 48);

          case 48:
            _ret = _context2.t2;

            if (!((0, _typeof2["default"])(_ret) === "object")) {
              _context2.next = 51;
              break;
            }

            return _context2.abrupt("return", _ret.v);

          case 51:
            _context2.next = 62;
            break;

          case 53:
            if (body.cokitchen_id) {
              _context2.next = 55;
              break;
            }

            throw (0, _helpers.UnprocessableEntity)('for deal type ALL, cokitchen_id is required');

          case 55:
            _context2.next = 57;
            return _deal["default"].query().insert(body)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Body');
            });

          case 57:
            deal_data = _context2.sent;

            if (!post) {
              _context2.next = 61;
              break;
            }

            _context2.next = 61;
            return (0, _PostService.newPost)(deal_data);

          case 61:
            return _context2.abrupt("return", {
              status: 'success',
              message: 'Deal Creation Successful',
              data: deal_data
            });

          case 62:
            _context2.next = 65;
            break;

          case 64:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 65:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createDeal(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createDeal = createDeal;

var createPost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var body, role, data;
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
            return (0, _PostService.newPost)(body);

          case 7:
            data = _context3.sent;
            return _context3.abrupt("return", {
              status: 'success',
              message: 'Post Creation Successful',
              data: data
            });

          case 11:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createPost(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createPost = createPost;

var updateDeal = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var id, body, role, deal_data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = ctx.params.id;
            body = ctx.request.body;
            role = ctx.state.user.user.role;
            _context4.next = 5;
            return (0, _RoleService.checkIfMarketing)(role);

          case 5:
            if (!_context4.sent) {
              _context4.next = 13;
              break;
            }

            if (body.images) {
              body.images = JSON.stringify(body.images);
            }

            _context4.next = 9;
            return _deal["default"].query().patchAndFetchById(id, body).withGraphFetched('[deal_type]');

          case 9:
            deal_data = _context4.sent;
            return _context4.abrupt("return", _objectSpread({
              status: 'success',
              message: 'Update Successful'
            }, deal_data));

          case 13:
            throw (0, _helpers.Unauthorized)('Unauthorized');

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateDeal(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateDeal = updateDeal;

var getDealTypes = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var _yield$Promise$all3, _yield$Promise$all4, deal_types, deal_eligibility_types, deal_value_types, deal_requirement_types;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Promise.all([_deal_type["default"].query()["catch"](function (e) {
              return [];
            }), _deal_eligibility_type["default"].query()["catch"](function (e) {
              return [];
            }), _deal_value_type["default"].query()["catch"](function (e) {
              return [];
            }), _deal_requirement_type["default"].query()["catch"](function (e) {
              return [];
            })]);

          case 2:
            _yield$Promise$all3 = _context5.sent;
            _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 4);
            deal_types = _yield$Promise$all4[0];
            deal_eligibility_types = _yield$Promise$all4[1];
            deal_value_types = _yield$Promise$all4[2];
            deal_requirement_types = _yield$Promise$all4[3];
            return _context5.abrupt("return", {
              status: 'success',
              message: 'Successful',
              deal_types: deal_types,
              deal_eligibility_types: deal_eligibility_types,
              deal_value_types: deal_value_types,
              deal_requirement_types: deal_requirement_types
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getDealTypes(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getDealTypes = getDealTypes;

var getCokitchenDeals = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(ctx) {
    var cokitchen_with_deals;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _cokitchen["default"].query().withGraphFetched('[deals.[deal_type, deal_value_type, deal_eligibility_type, deal_requirement_type]]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            cokitchen_with_deals = _context6.sent;
            return _context6.abrupt("return", {
              status: 'success',
              message: 'Successful',
              data: cokitchen_with_deals
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCokitchenDeals(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCokitchenDeals = getCokitchenDeals;

var getCokitchenHomePagePosts = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(ctx) {
    var cokitchen_home_page_posts;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _cokitchen["default"].query().withGraphFetched('[cokitchen_home_page_posts]')["catch"](function (e) {
              console.log(e);
              return [];
            });

          case 2:
            cokitchen_home_page_posts = _context7.sent;
            return _context7.abrupt("return", {
              status: 'success',
              message: 'Successful',
              data: cokitchen_home_page_posts
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getCokitchenHomePagePosts(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCokitchenHomePagePosts = getCokitchenHomePagePosts;

var updatePostsArrangement = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(ctx) {
    var role, body, posts, cokitchen_home_page_post_data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            role = ctx.state.user.user.role;
            body = ctx.request.body;
            _context8.next = 4;
            return (0, _RoleService.checkIfMarketing)(role);

          case 4:
            if (!_context8.sent) {
              _context8.next = 17;
              break;
            }

            posts = body.posts;
            _context8.next = 8;
            return _cokitchen_home_page_post["default"].query().where(cokitchen_id, body.cokitchen_id)["catch"](function () {
              throw (0, _helpers.NotFound)('Cokitchen Post not found');
            });

          case 8:
            cokitchen_home_page_post_data = _context8.sent;
            cokitchen_home_page_post_data[0].posts = posts;
            cokitchen_home_page_post_data[0].posts = JSON.stringify(cokitchen_home_page_post_data[0].posts);
            _context8.next = 13;
            return _cokitchen_home_page_post["default"].query().patchAndFetchById(cokitchen_home_page_post_data[0].id, cokitchen_home_page_post_data[0]);

          case 13:
            cokitchen_home_page_post_data = _context8.sent;
            return _context8.abrupt("return", {
              status: 'success',
              message: 'Cokitchen Home page posts arrangement updated Successfully',
              data: cokitchen_home_page_post_data
            });

          case 17:
            throw (0, _helpers.Unauthorized)('Unauthorized Update');

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function updatePostsArrangement(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.updatePostsArrangement = updatePostsArrangement;
//# sourceMappingURL=deal.controller.js.map