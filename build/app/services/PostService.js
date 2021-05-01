"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.newPost = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objection = require("objection");

var _user = _interopRequireDefault(require("../models/user"));

var _posts = _interopRequireDefault(require("../models/posts"));

var _cokitchen_home_page_post = _interopRequireDefault(require("../models/cokitchen_home_page_post"));

var _helpers = require("../helpers");

var newPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var data_to_insert, post, cokitchen_home_page_post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data_to_insert = {
              title: data.title,
              body: data.body,
              heading: data.heading,
              images: data.images,
              to_expire_date: data.to_expire_date,
              to_expire_time: data.to_expire_time,
              to_start_date: data.to_start_date,
              to_start_time: data.to_start_time
            };

            if (data.id) {
              data_to_insert.deal_id = data.id;
            }

            _context.next = 4;
            return _posts["default"].query().insert(data_to_insert)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Post data invalid');
            });

          case 4:
            post = _context.sent;
            _context.next = 7;
            return _cokitchen_home_page_post["default"].query().where(data.cokitchen_id, data.cokitchen_id)["catch"](function (e) {
              console.log(e);
              return false;
            });

          case 7:
            cokitchen_home_page_post = _context.sent;

            if (!cokitchen_home_page_post) {
              _context.next = 16;
              break;
            }

            cokitchen_home_page_post.posts.push(post);
            cokitchen_home_page_post.posts = JSON.stringify(cokitchen_home_page_post.posts);
            _context.next = 13;
            return _cokitchen_home_page_post["default"].query().patchAndFetchById(cokitchen_home_page_post.id, cokitchen_home_page_post)["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Cokitchen Home page post data');
            });

          case 13:
            cokitchen_home_page_post = _context.sent;
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return _cokitchen_home_page_post["default"].query().insert({
              posts: JSON.stringify([post]),
              cokitchen_id: adata.cokitchen_id
            })["catch"](function (e) {
              console.log(e);
              throw (0, _helpers.UnprocessableEntity)('Invalid Insert Cokitchen Home page post data');
            });

          case 18:
            cokitchen_home_page_post = _context.sent;

          case 19:
            return _context.abrupt("return", {
              post: post,
              cokitchen_home_page_post: cokitchen_home_page_post
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function newPost(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.newPost = newPost;
var _default = {
  newPost: newPost
};
exports["default"] = _default;
//# sourceMappingURL=PostService.js.map