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

var _path = _interopRequireDefault(require("path"));

var _brand = _interopRequireDefault(require("./brand"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Deal = /*#__PURE__*/function (_modelUuid) {
  (0, _inherits2["default"])(Deal, _modelUuid);

  var _super = _createSuper(Deal);

  function Deal() {
    (0, _classCallCheck2["default"])(this, Deal);
    return _super.apply(this, arguments);
  }

  return Deal;
}((0, _index.modelUuid)(_index.baseModel));

(0, _defineProperty2["default"])(Deal, "tableName", 'deals');
(0, _defineProperty2["default"])(Deal, "hidden", ['deal_type_id', 'brand_id']);
(0, _defineProperty2["default"])(Deal, "relationMappings", {
  deal_type: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _path["default"].join(__dirname, 'deal_type'),
    join: {
      from: 'deals.deal_type_id',
      to: 'deal_types.id'
    }
  },
  deal_value_type: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _path["default"].join(__dirname, 'deal_value_type'),
    join: {
      from: 'deals.deal_value_type_id',
      to: 'deal_value_types.id'
    }
  },
  deal_eligibility_type: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _path["default"].join(__dirname, 'deal_eligibility_type'),
    join: {
      from: 'deals.deal_eligibility_type_id',
      to: 'deal_eligibility_types.id'
    }
  },
  deal_requirement_type: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _path["default"].join(__dirname, 'deal_requirement_type'),
    join: {
      from: 'deals.deal_requirement_type_id',
      to: 'deal_requirement_types.id'
    }
  },
  brand: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _brand["default"],
    join: {
      from: 'deals.brand_id',
      to: 'brands.id'
    }
  }
});
var _default = Deal;
exports["default"] = _default;
//# sourceMappingURL=deal.js.map