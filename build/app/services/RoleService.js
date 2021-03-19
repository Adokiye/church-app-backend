'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports[
  'default'
] = exports.checkIfLogisticsSuperAdmin = exports.checkIfLogisticsAdmin = exports.checkIfAdmin = exports.checkIfMarketingAdmin = exports.checkIfMarketing = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

// users that can carry out marketing tasks
var marketing = ['MARKETING', 'ADMIN', 'MARKETING_ADMIN']
var marketingAdmin = ['ADMIN', 'MARKETING_ADMIN']
var admin = ['ADMIN'] // users that can carry out logisitcs admin tasks

var logisitcsAdmin = ['LOGISTICS_ADMIN', 'LOGISTICS_SUPER_ADMIN', 'ADMIN'] //users that can carry out logistics super admin tasks

var logisticsSuperAdmin = ['LOGISTICS_SUPER_ADMIN', 'ADMIN']

var checkIfMarketing = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(role_name) {
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              return _context.abrupt('return', marketing.includes(role_name))

            case 1:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function checkIfMarketing(_x) {
    return _ref.apply(this, arguments)
  }
})()

exports.checkIfMarketing = checkIfMarketing

var checkIfMarketingAdmin = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(role_name) {
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              return _context2.abrupt(
                'return',
                marketingAdmin.includes(role_name)
              )

            case 1:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2)
    })
  )

  return function checkIfMarketingAdmin(_x2) {
    return _ref2.apply(this, arguments)
  }
})()

exports.checkIfMarketingAdmin = checkIfMarketingAdmin

var checkIfAdmin = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(role_name) {
      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              return _context3.abrupt('return', admin.includes(role_name))

            case 1:
            case 'end':
              return _context3.stop()
          }
        }
      }, _callee3)
    })
  )

  return function checkIfAdmin(_x3) {
    return _ref3.apply(this, arguments)
  }
})()

exports.checkIfAdmin = checkIfAdmin

var checkIfLogisticsAdmin = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(role_name) {
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              return _context4.abrupt(
                'return',
                logisitcsAdmin.includes(role_name)
              )

            case 1:
            case 'end':
              return _context4.stop()
          }
        }
      }, _callee4)
    })
  )

  return function checkIfLogisticsAdmin(_x4) {
    return _ref4.apply(this, arguments)
  }
})()

exports.checkIfLogisticsAdmin = checkIfLogisticsAdmin

var checkIfLogisticsSuperAdmin = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(role_name) {
      return _regenerator['default'].wrap(function _callee5$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              return _context5.abrupt(
                'return',
                logisticsSuperAdmin.includes(role_name)
              )

            case 1:
            case 'end':
              return _context5.stop()
          }
        }
      }, _callee5)
    })
  )

  return function checkIfLogisticsSuperAdmin(_x5) {
    return _ref5.apply(this, arguments)
  }
})()

exports.checkIfLogisticsSuperAdmin = checkIfLogisticsSuperAdmin
var _default = {
  checkIfAdmin: checkIfAdmin,
  checkIfLogisticsAdmin: checkIfLogisticsAdmin,
  checkIfMarketing: checkIfMarketing,
  checkIfLogisticsSuperAdmin: checkIfLogisticsSuperAdmin,
  checkIfMarketingAdmin: checkIfMarketingAdmin
}
exports['default'] = _default
//# sourceMappingURL=RoleService.js.map
