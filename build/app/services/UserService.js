'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports[
  'default'
] = exports.updateNewUserService = exports.newCustomerService = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _objection = require('objection')

var _user = _interopRequireDefault(require('../models/user'))

var _role = _interopRequireDefault(require('../models/role'))

var _free_delivery = _interopRequireDefault(require('../models/free_delivery'))

var _helpers = require('../helpers')

var newCustomerService = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(phone_number) {
      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2
              return (0, _objection.transaction)(
                _user['default'],
                /*#__PURE__*/ (function () {
                  var _ref2 = (0, _asyncToGenerator2['default'])(
                    /*#__PURE__*/ _regenerator['default'].mark(function _callee(
                      User
                    ) {
                      var customerRole,
                        _yield$Promise$all,
                        _yield$Promise$all2,
                        user,
                        free_delivery

                      return _regenerator['default'].wrap(function _callee$(
                        _context
                      ) {
                        while (1) {
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2
                              return _role['default'].query().find({
                                name: 'CUSTOMER'
                              })

                            case 2:
                              customerRole = _context.sent
                              _context.next = 5
                              return Promise.all([
                                User.query()
                                  .insert({
                                    phone_number: phone_number,
                                    role_id: customerRole.id,
                                    active: true
                                  })
                                  .withGraphFetched('[role]')
                              ])

                            case 5:
                              _yield$Promise$all = _context.sent
                              _yield$Promise$all2 = (0,
                              _slicedToArray2['default'])(_yield$Promise$all, 1)
                              user = _yield$Promise$all2[0]
                              console.log(user)
                              _context.next = 11
                              return _free_delivery['default'].query().insert({
                                user_id: user.id
                              })

                            case 11:
                              free_delivery = _context.sent
                              return _context.abrupt('return', {
                                user: user,
                                free_delivery: free_delivery
                              })

                            case 13:
                            case 'end':
                              return _context.stop()
                          }
                        }
                      },
                      _callee)
                    })
                  )

                  return function (_x2) {
                    return _ref2.apply(this, arguments)
                  }
                })()
              )

            case 2:
              return _context2.abrupt('return', _context2.sent)

            case 3:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2)
    })
  )

  return function newCustomerService(_x) {
    return _ref.apply(this, arguments)
  }
})()

exports.newCustomerService = newCustomerService

var updateNewUserService = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(
      personal_details,
      user
    ) {
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              _context4.next = 2
              return (0, _objection.transaction)(
                _user['default'],
                /*#__PURE__*/ (function () {
                  var _ref4 = (0, _asyncToGenerator2['default'])(
                    /*#__PURE__*/ _regenerator['default'].mark(
                      function _callee3(User) {
                        var user_data
                        return _regenerator['default'].wrap(function _callee3$(
                          _context3
                        ) {
                          while (1) {
                            switch ((_context3.prev = _context3.next)) {
                              case 0:
                                //  clean up data
                                delete personal_details.phone_number
                                delete personal_details.role_id
                                delete personal_details.logistics_company_id
                                _context3.next = 5
                                return (0, _helpers.encryptPassword)(
                                  personal_details.password
                                )

                              case 5:
                                personal_details.password = _context3.sent
                                _context3.next = 8
                                return User.query()
                                  .patchAndFetchById(user.id, personal_details)
                                  .withGraphFetched('[role]')

                              case 8:
                                user_data = _context3.sent
                                return _context3.abrupt('return', {
                                  user_data: user_data
                                })

                              case 10:
                              case 'end':
                                return _context3.stop()
                            }
                          }
                        },
                        _callee3)
                      }
                    )
                  )

                  return function (_x5) {
                    return _ref4.apply(this, arguments)
                  }
                })()
              )

            case 2:
              return _context4.abrupt('return', _context4.sent)

            case 3:
            case 'end':
              return _context4.stop()
          }
        }
      }, _callee4)
    })
  )

  return function updateNewUserService(_x3, _x4) {
    return _ref3.apply(this, arguments)
  }
})()

exports.updateNewUserService = updateNewUserService
var _default = {
  newCustomerService: newCustomerService,
  updateNewUserService: updateNewUserService
}
exports['default'] = _default
//# sourceMappingURL=UserService.js.map
