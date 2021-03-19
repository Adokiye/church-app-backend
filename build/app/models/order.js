'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
)

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
)

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _index = require('./index')

var _objection = require('objection')

var _order_type = _interopRequireDefault(require('./order_type'))

var _user_card = _interopRequireDefault(require('./user_card'))

var _calculated_order = _interopRequireDefault(require('./calculated_order'))

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2['default'])(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2['default'])(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return (0, _possibleConstructorReturn2['default'])(this, result)
  }
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}

var Order = /*#__PURE__*/ (function (_modelUuid) {
  ;(0, _inherits2['default'])(Order, _modelUuid)

  var _super = _createSuper(Order)

  function Order() {
    ;(0, _classCallCheck2['default'])(this, Order)
    return _super.apply(this, arguments)
  }

  return Order
})((0, _index.modelUuid)(_index.baseModel))

;(0, _defineProperty2['default'])(Order, 'tableName', 'orders')
;(0, _defineProperty2['default'])(Order, 'hidden', ['order_type_id', 'card_id'])
;(0, _defineProperty2['default'])(Order, 'relationMappings', {
  order_type: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _order_type['default'],
    join: {
      from: 'orders.order_type_id',
      to: 'order_types.id'
    }
  },
  user_card: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _user_card['default'],
    join: {
      from: 'orders.user_card_id',
      to: 'user_cards.id'
    }
  },
  calculated_order: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _calculated_order['default'],
    join: {
      from: 'orders.calculated_order_id',
      to: 'calculated_orders.id'
    }
  }
})
var _default = Order
exports['default'] = _default
//# sourceMappingURL=order.js.map
