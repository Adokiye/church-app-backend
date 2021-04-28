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

var _index = require("./index");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SuperMealCategory = /*#__PURE__*/function (_modelUuid) {
  (0, _inherits2["default"])(SuperMealCategory, _modelUuid);

  var _super = _createSuper(SuperMealCategory);

  function SuperMealCategory() {
    (0, _classCallCheck2["default"])(this, SuperMealCategory);
    return _super.apply(this, arguments);
  }

  return SuperMealCategory;
}((0, _index.modelUuid)(_index.baseModel));

(0, _defineProperty2["default"])(SuperMealCategory, "tableName", 'super_meal_categories');
(0, _defineProperty2["default"])(SuperMealCategory, "hidden", ['posist_data']);
var _default = SuperMealCategory;
exports["default"] = _default;
//# sourceMappingURL=supermeal_category.js.map