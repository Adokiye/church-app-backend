'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.errorHandlingMiddleware = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _helpers = require('../helpers')

var errorHandlingMiddleware = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(ctx, next) {
      var errorObject
      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                _context.next = 3
                return next()

              case 3:
                ctx.body = _context.sent
                _context.next = 11
                break

              case 6:
                _context.prev = 6
                _context.t0 = _context['catch'](0)
                errorObject = (0, _helpers.errorHandling)(_context.t0)
                ctx.status = errorObject.statusCode
                ctx.body = errorObject

              case 11:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 6]]
      )
    })
  )

  return function errorHandlingMiddleware(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

exports.errorHandlingMiddleware = errorHandlingMiddleware
//# sourceMappingURL=error-handling-middleware.js.map
