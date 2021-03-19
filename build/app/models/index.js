'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports[
  'default'
] = exports.baseModel = exports.modelUnique = exports.modelUuid = void 0

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)

var _get3 = _interopRequireDefault(require('@babel/runtime/helpers/get'))

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
)

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
)

var _objection = require('objection')

var _knex = _interopRequireDefault(require('knex'))

var _objectionGuid = _interopRequireDefault(require('objection-guid'))

var _objectionVisibility = _interopRequireDefault(
  require('objection-visibility')
)

var _objectionDbErrors = require('objection-db-errors')

var _objectionUnique = _interopRequireDefault(require('objection-unique'))

var _knexfile = _interopRequireDefault(require('../../db/knexfile'))

var _config = require('../config')

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

var knex = (0, _knex['default'])(_knexfile['default'][_config.NODE_ENV])

_objection.Model.knex(knex)

var modelUuid = (0, _objectionGuid['default'])() // Import the plugin.

exports.modelUuid = modelUuid
var modelUnique = (0, _objectionUnique['default'])({
  fields: ['email', 'phone_number'],
  identifiers: ['id']
})
exports.modelUnique = modelUnique

var baseModel = /*#__PURE__*/ (function (_mixin) {
  ;(0, _inherits2['default'])(baseModel, _mixin)

  var _super = _createSuper(baseModel)

  function baseModel() {
    ;(0, _classCallCheck2['default'])(this, baseModel)
    return _super.apply(this, arguments)
  }

  ;(0, _createClass2['default'])(baseModel, null, [
    {
      key: 'query',
      value: function query() {
        var _get2

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (_get2 = (0, _get3['default'])(
          (0, _getPrototypeOf2['default'])(baseModel),
          'query',
          this
        )).call
          .apply(_get2, [this].concat(args))
          .throwIfNotFound()
      }
    }
  ])
  return baseModel
})(
  (0, _objection.mixin)(_objection.Model, [
    _objectionVisibility['default'],
    _objectionDbErrors.DBErrors
  ])
)

exports.baseModel = baseModel
var _default = {
  baseModel: baseModel,
  modelUuid: modelUuid,
  modelUnique: modelUnique
}
exports['default'] = _default
//# sourceMappingURL=index.js.map
