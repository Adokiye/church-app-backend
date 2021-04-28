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

var _index = require("./index");

var _objection = require("objection");

var _cokitchen = _interopRequireDefault(require("./cokitchen"));

var _meal_keyword = _interopRequireDefault(require("./meal_keyword"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CokitchenExploreKeyword = /*#__PURE__*/function (_modelUuid) {
  (0, _inherits2["default"])(CokitchenExploreKeyword, _modelUuid);

  var _super = _createSuper(CokitchenExploreKeyword);

  function CokitchenExploreKeyword() {
    (0, _classCallCheck2["default"])(this, CokitchenExploreKeyword);
    return _super.apply(this, arguments);
  }

  return CokitchenExploreKeyword;
}((0, _index.modelUuid)(_index.baseModel));

(0, _defineProperty2["default"])(CokitchenExploreKeyword, "tableName", 'cokitchen_explore_keywords');
(0, _defineProperty2["default"])(CokitchenExploreKeyword, "relationMappings", {
  cokitchen: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _cokitchen["default"],
    join: {
      from: 'cokitchen_explore_keywords.cokitchen_id',
      to: 'cokitchens.id'
    }
  },
  meal_keyword: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _meal_keyword["default"],
    join: {
      from: 'cokitchen_explore_keywords.meal_keyword_id',
      to: 'meal_keywords.id'
    }
  }
});
var _default = CokitchenExploreKeyword;
exports["default"] = _default;
//# sourceMappingURL=cokitchen_explore_keyword.js.map