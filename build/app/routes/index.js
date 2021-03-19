'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _koaRouter = _interopRequireDefault(require('koa-router'))

var _api = _interopRequireDefault(require('./api.js'))

var _koaSwaggerDecorator = require('koa-swagger-decorator')

//const router = new Router()
var router = new _koaSwaggerDecorator.SwaggerRouter()
var api = new _koaRouter['default']()
api.use(_api['default'])
/**
 * Root api endpoint
 * @returns health condition and service name
 */

router.get('/', function () {
  return {
    status: true,
    health: 'ok',
    message: 'Food Court App'
  }
})
router.use('/v1', api.routes())
var _default = router
exports['default'] = _default
//# sourceMappingURL=index.js.map
