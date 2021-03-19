'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.internalAuthentication = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _helpers = require('../helpers')

var _api_key = _interopRequireDefault(require('../models/api_key'))

var internalRoutes = [
  {
    url: '/v1/internal',
    method: 'GET'
  }
]

var isAnInternalRouteToCheck = function isAnInternalRouteToCheck(request) {
  return internalRoutes.find(
    function (item) {
      return request.url.includes(item.url)
    } // && item.method === request.method
  )
}

var internalAuthentication = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(_ref, next) {
      var request, requestKeyValue
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              request = _ref.request
              requestKeyValue = request.headers['x-api-key']

              if (!(requestKeyValue || isAnInternalRouteToCheck(request))) {
                _context.next = 5
                break
              }

              _context.next = 5
              return _api_key['default']
                .query()
                .findOne({
                  key: 'APP_KEY',
                  value: requestKeyValue,
                  active: true
                })
                ['catch'](function () {
                  throw (0,
                  _helpers.Unauthorized)('Please provide a valid app key')
                })

            case 5:
              return _context.abrupt('return', next())

            case 6:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function internalAuthentication(_x, _x2) {
    return _ref2.apply(this, arguments)
  }
})()

exports.internalAuthentication = internalAuthentication
//# sourceMappingURL=internal-auth-middleware.js.map
