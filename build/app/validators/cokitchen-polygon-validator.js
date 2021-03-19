'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _joi = _interopRequireDefault(require('@hapi/joi'))

var _middlewares = require('../middlewares')

var point = _joi['default']
  .array()
  .items(_joi['default'].number())
  .min(2)
  .max(2)

var CokitchenPolygonValidator = {
  create: function create() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        polygon: _joi['default'].array().items(point).required(),
        cokitchen_id: _joi['default'].string().required()
      }
    })
  },
  update: function update() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        polygon: _joi['default'].array().items(point).required()
      }
    })
  }
}
var _default = CokitchenPolygonValidator
exports['default'] = _default
//# sourceMappingURL=cokitchen-polygon-validator.js.map
