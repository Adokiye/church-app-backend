"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objection = require("objection");

var _deal = _interopRequireDefault(require("./deal"));

var _index = require("./index");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Post = /*#__PURE__*/function (_modelUuid) {
  (0, _inherits2["default"])(Post, _modelUuid);

  var _super = _createSuper(Post);

  function Post() {
    (0, _classCallCheck2["default"])(this, Post);
    return _super.apply(this, arguments);
  }

  return Post;
}((0, _index.modelUuid)(_index.baseModel));

(0, _defineProperty2["default"])(Post, "tableName", 'posts');
(0, _defineProperty2["default"])(Post, "hidden", ['deal_id']);
(0, _defineProperty2["default"])(Post, "relationMappings", {
  deal: {
    relation: _objection.Model.HasOneRelation,
    modelClass: _deal["default"],
    join: {
      from: 'posts.deal_id',
      to: 'deals.id'
    }
  }
});
var _default = Post;
exports["default"] = _default;
//# sourceMappingURL=posts.js.map