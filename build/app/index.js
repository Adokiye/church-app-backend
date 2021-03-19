'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _server = _interopRequireDefault(require('./server.js'))

var _process = _interopRequireDefault(require('process'))

var _index = require('./helpers/index.js')

var _config = require('./config.js')

_server['default'].shutdown = function () {
  return _process['default'].exit()
}

_process['default'].on('SIGINT', function () {
  return _server['default'].shutdown()
})

_process['default'].on('SIGTERM', function () {
  return _server['default'].shutdown()
})

;(0, _index.createTempFileStorage)({
  dirname: 'files'
})

_server['default'].listen(_config.PORT, function () {
  return console.log('Listening on port '.concat(_config.PORT))
})

var _default = _server['default']
exports['default'] = _default
//# sourceMappingURL=index.js.map
