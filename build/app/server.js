'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _koa = _interopRequireDefault(require('koa'))

var _koaLogger = _interopRequireDefault(require('koa-logger'))

var _cors = _interopRequireDefault(require('@koa/cors'))

var _koaBody = _interopRequireDefault(require('koa-body'))

var _koaHelmet = _interopRequireDefault(require('koa-helmet'))

var _index = _interopRequireDefault(require('./routes/index.js'))

var _index2 = require('./middlewares/index.js')

var app = new _koa['default']()
app.use((0, _koaHelmet['default'])())
app.use((0, _koaLogger['default'])())
app.use(
  (0, _cors['default'])({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)
app.use(
  (0, _koaBody['default'])({
    multipart: true
  })
)
app.use(_index2.errorHandlingMiddleware)
app.use(_index2.authMiddleware)
app.use(_index2.internalAuthentication)
app.use(_index['default'].routes())
app.use(_index['default'].allowedMethods())
var _default = app
exports['default'] = _default
//# sourceMappingURL=server.js.map
