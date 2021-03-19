'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _joi = _interopRequireDefault(require('@hapi/joi'))

var _middlewares = require('../middlewares')

var point = _joi['default'].object().keys({
  lat: _joi['default'].number().required(),
  lng: _joi['default'].number().required()
})

var CokitchenValidator = {
  update: function update() {
    return (0, _middlewares.validationMiddleware)({
      body: {
        name: _joi['default'].string() // cokitchen_id: Joi.string().required(),
      }
    })
  }
}
var _default = CokitchenValidator
exports['default'] = _default
//# sourceMappingURL=cokitchen-validator.js.map
