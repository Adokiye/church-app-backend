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

var _objection = require('objection')

var _index = require('./index')

var _bcrypt = _interopRequireDefault(require('bcrypt'))

var _role = _interopRequireDefault(require('./role'))

var _logistics_company = _interopRequireDefault(require('./logistics_company'))

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

var User = /*#__PURE__*/ (function (_modelUuid) {
  ;(0, _inherits2['default'])(User, _modelUuid)

  var _super = _createSuper(User)

  function User() {
    ;(0, _classCallCheck2['default'])(this, User)
    return _super.apply(this, arguments)
  }

  return User
})((0, _index.modelUuid)(_index.baseModel))

;(0, _defineProperty2['default'])(User, 'tableName', 'users')
;(0, _defineProperty2['default'])(User, 'hidden', [
  'password',
  'password_reset_token',
  'email_confirm_token',
  'role_id',
  'logistics_company_id'
])
;(0, _defineProperty2['default'])(User, 'relationMappings', {
  role: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _role['default'],
    join: {
      from: 'users.role_id',
      to: 'roles.id'
    }
  },
  logistics_company: {
    relation: _objection.Model.BelongsToOneRelation,
    modelClass: _logistics_company['default'],
    join: {
      from: 'users.logistics_company_id',
      to: 'logistics_companies.id'
    }
  }
})
var _default = User
exports['default'] = _default
//# sourceMappingURL=user.js.map
