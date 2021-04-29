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

var _meal_category = _interopRequireDefault(require("./meal_category"));

var _addons = _interopRequireDefault(require("./addons"));

var _brand = _interopRequireDefault(require("./brand"));

var _index = require("./index");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Meal = /*#__PURE__*/function (_modelUuid) {
  (0, _inherits2["default"])(Meal, _modelUuid);

  var _super = _createSuper(Meal);

  function Meal() {
    (0, _classCallCheck2["default"])(this, Meal);
    return _super.apply(this, arguments);
  }

  return Meal;
}((0, _index.modelUuid)(_index.baseModel));

(0, _defineProperty2["default"])(Meal, "tableName", 'meals');
(0, _defineProperty2["default"])(Meal, "hidden", ['meal_category_id', 'posist_data']);
(0, _defineProperty2["default"])(Meal, "relationMappings", {
  meal_category: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _meal_category["default"],
    join: {
      from: 'meals.meal_category_id',
      to: 'meal_categories.id'
    }
  },
  brand: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _brand["default"],
    join: {
      from: 'meals.brand_id',
      to: 'brands.id'
    }
  },
  addons: {
    relation: _objection.Model.HasManyRelation,
    modelClass: _addons["default"],
    join: {
      from: 'addons.meal_id',
      to: 'meals.id'
    }
  }
});
var _default = Meal;
exports["default"] = _default;
//# sourceMappingURL=meal.js.map