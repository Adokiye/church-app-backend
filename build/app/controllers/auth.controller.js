'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.verifyUser = exports.login = exports.adminGetUserRoles = exports.adminGetUsers = exports.marketingCreateStaff = exports.adminUpdateUser = exports.update = exports.create = exports.verifyOtp = exports.sendOtp = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _user = _interopRequireDefault(require('../models/user'))

var _role = _interopRequireDefault(require('../models/role'))

var _JwtService = _interopRequireDefault(require('../services/JwtService'))

var _OtpService = _interopRequireDefault(require('../services/OtpService'))

var _otp = _interopRequireDefault(require('../models/otp'))

var _bcryptjs = _interopRequireDefault(require('bcryptjs'))

var _crypto = _interopRequireDefault(require('crypto'))

var _UserService = require('../services/UserService')

var _RoleService = require('../services/RoleService')

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        ;(0, _defineProperty2['default'])(target, key, source[key])
      })
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        )
      })
    }
  }
  return target
}

var status = 'success'
var message = 'Success!'

var sendOtp = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(ctx) {
      var body
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              body = ctx.request.body
              _context.next = 3
              return _OtpService['default'].sendOtp({
                phone_number: body.phone_number,
                action: body.action
              })

            case 3:
              return _context.abrupt('return', {
                status: 'success',
                message: 'Otp sent successfully'
              })

            case 4:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function sendOtp(_x) {
    return _ref.apply(this, arguments)
  }
})()

exports.sendOtp = sendOtp

var verifyOtp = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(ctx, next) {
      var body, otpInDb, _JwtService$verify, status, message, decoded

      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              body = ctx.request.body

              if (body.otp) {
                _context2.next = 3
                break
              }

              return _context2.abrupt(
                'return',
                res.status(400).json({
                  status: 'error',
                  message: 'Validation Error',
                  errors: {
                    otp: ['otp is required']
                  }
                })
              )

            case 3:
              _context2.next = 5
              return _otp['default']
                .query()
                .where({
                  phone_number: body.phone_number,
                  action: body.action
                })
                ['catch'](function () {
                  return false
                })

            case 5:
              otpInDb = _context2.sent

              if (otpInDb) {
                ctx['throw'](404, 'NOT FOUND', {
                  errors: {
                    phone_number: ['no otp has been sent to this number']
                  }
                })
              }

              ;(_JwtService$verify = _JwtService['default'].verify(
                otpInDb.otp_token
              )),
                (status = _JwtService$verify.status),
                (message = _JwtService$verify.message),
                (decoded = _JwtService$verify.decoded)

              if (!status) {
                ctx['throw'](400, 'otp is '.concat(message))
              }

              if (!(decoded.otp !== body.otp)) {
                _context2.next = 11
                break
              }

              return _context2.abrupt('return', {
                status: 'error',
                message: 'Invalid otp'
              })

            case 11:
              return _context2.abrupt('return', next())

            case 12:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2)
    })
  )

  return function verifyOtp(_x2, _x3) {
    return _ref2.apply(this, arguments)
  }
})()

exports.verifyOtp = verifyOtp

var create = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(ctx) {
      var phone_number, userInDb, _userData

      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              phone_number = ctx.request.body.phone_number
              _context3.next = 3
              return _user['default']
                .query()
                .where({
                  phone_number: phone_number
                })
                .withGraphFetched('[role]')
                ['catch'](function () {
                  return false
                })

            case 3:
              userInDb = _context3.sent

              if (userInDb) {
                _context3.next = 11
                break
              }

              _context3.next = 7
              return (0, _UserService.newCustomerService)(phone_number)

            case 7:
              _userData = _context3.sent
              return _context3.abrupt(
                'return',
                _objectSpread(
                  _objectSpread(
                    {
                      status: status,
                      message: message
                    },
                    _userData
                  ),
                  {},
                  {
                    token: _JwtService['default'].sign({
                      user: _userData.user
                    })
                  }
                )
              )

            case 11:
              return _context3.abrupt(
                'return',
                _objectSpread(
                  _objectSpread(
                    {
                      status: status,
                      message: message
                    },
                    userInDb
                  ),
                  {},
                  {
                    token: _JwtService['default'].sign(
                      _objectSpread({}, userData.user)
                    )
                  }
                )
              )

            case 12:
            case 'end':
              return _context3.stop()
          }
        }
      }, _callee3)
    })
  )

  return function create(_x4) {
    return _ref3.apply(this, arguments)
  }
})()

exports.create = create

var update = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(ctx) {
      var personal_details,
        id,
        _yield$User$query$whe,
        _yield$User$query$whe2,
        user,
        userData

      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              personal_details = ctx.request.body.personal_details
              id = ctx.state.user.id
              _context4.next = 4
              return _user['default']
                .query()
                .where({
                  id: id
                })
                ['catch'](function () {
                  throw Unauthorized('User not found please register')
                })

            case 4:
              _yield$User$query$whe = _context4.sent
              _yield$User$query$whe2 = (0, _slicedToArray2['default'])(
                _yield$User$query$whe,
                1
              )
              user = _yield$User$query$whe2[0]
              _context4.next = 9
              return (0, _UserService.updateNewUserService)(
                personal_details,
                user
              )

            case 9:
              userData = _context4.sent
              return _context4.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  userData
                )
              )

            case 11:
            case 'end':
              return _context4.stop()
          }
        }
      }, _callee4)
    })
  )

  return function update(_x5) {
    return _ref4.apply(this, arguments)
  }
})() //admin

exports.update = update

var adminUpdateUser = /*#__PURE__*/ (function () {
  var _ref5 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee5(ctx) {
      var body, role, user_data
      return _regenerator['default'].wrap(function _callee5$(_context5) {
        while (1) {
          switch ((_context5.prev = _context5.next)) {
            case 0:
              body = ctx.request.body
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfAdmin)(role.name)) {
                _context5.next = 13
                break
              }

              if (!body.password) {
                _context5.next = 7
                break
              }

              _context5.next = 6
              return encryptPassword(body.password)

            case 6:
              body.password = _context5.sent

            case 7:
              _context5.next = 9
              return _user['default']
                .query()
                .patchAndFetchById(body.user_id, body)
                .withGraphFetched('[role]')

            case 9:
              user_data = _context5.sent
              return _context5.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  user_data
                )
              )

            case 13:
              throw Unauthorized('Unauthorized')

            case 14:
            case 'end':
              return _context5.stop()
          }
        }
      }, _callee5)
    })
  )

  return function adminUpdateUser(_x6) {
    return _ref5.apply(this, arguments)
  }
})() //marketing admin

exports.adminUpdateUser = adminUpdateUser

var marketingCreateStaff = /*#__PURE__*/ (function () {
  var _ref6 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee6(ctx) {
      var body, role, marketing, user_data
      return _regenerator['default'].wrap(function _callee6$(_context6) {
        while (1) {
          switch ((_context6.prev = _context6.next)) {
            case 0:
              body = ctx.request.body
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfMarketingAdmin)(role.name)) {
                _context6.next = 17
                break
              }

              _context6.next = 5
              return _role['default'].query().find({
                name: 'MARKETING'
              })

            case 5:
              marketing = _context6.sent
              body.role_id = marketing.role_id
              body.active = false
              _context6.next = 10
              return encryptPassword(body.password)

            case 10:
              body.password = _context6.sent
              _context6.next = 13
              return _user['default']
                .query()
                .insert(body)
                .withGraphFetched('[role]')

            case 13:
              user_data = _context6.sent
              return _context6.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  user_data
                )
              )

            case 17:
              throw Unauthorized('Unauthorized')

            case 18:
            case 'end':
              return _context6.stop()
          }
        }
      }, _callee6)
    })
  )

  return function marketingCreateStaff(_x7) {
    return _ref6.apply(this, arguments)
  }
})()

exports.marketingCreateStaff = marketingCreateStaff

var adminGetUsers = /*#__PURE__*/ (function () {
  var _ref7 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee7(ctx) {
      var role, data
      return _regenerator['default'].wrap(function _callee7$(_context7) {
        while (1) {
          switch ((_context7.prev = _context7.next)) {
            case 0:
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfAdmin)(role.name)) {
                _context7.next = 8
                break
              }

              _context7.next = 4
              return _user['default'].query().withGraphFetched('[role]')

            case 4:
              data = _context7.sent
              return _context7.abrupt('return', {
                status: 'success',
                message: 'Users returned Successfully',
                data: data
              })

            case 8:
              throw Unauthorized('Unauthorized')

            case 9:
            case 'end':
              return _context7.stop()
          }
        }
      }, _callee7)
    })
  )

  return function adminGetUsers(_x8) {
    return _ref7.apply(this, arguments)
  }
})()

exports.adminGetUsers = adminGetUsers

var adminGetUserRoles = /*#__PURE__*/ (function () {
  var _ref8 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee8(ctx) {
      var role, data
      return _regenerator['default'].wrap(function _callee8$(_context8) {
        while (1) {
          switch ((_context8.prev = _context8.next)) {
            case 0:
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfAdmin)(role.name)) {
                _context8.next = 8
                break
              }

              _context8.next = 4
              return _role['default'].query()

            case 4:
              data = _context8.sent
              return _context8.abrupt('return', {
                status: 'success',
                message: 'Update Successful',
                data: data
              })

            case 8:
              throw Unauthorized('Unauthorized')

            case 9:
            case 'end':
              return _context8.stop()
          }
        }
      }, _callee8)
    })
  )

  return function adminGetUserRoles(_x9) {
    return _ref8.apply(this, arguments)
  }
})()

exports.adminGetUserRoles = adminGetUserRoles

var login = /*#__PURE__*/ (function () {
  var _ref9 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee9(ctx) {
      var body, user, isValid
      return _regenerator['default'].wrap(function _callee9$(_context9) {
        while (1) {
          switch ((_context9.prev = _context9.next)) {
            case 0:
              body = ctx.request.body
              _context9.next = 3
              return _user['default']
                .query()
                .findOne({
                  email: body.email
                })
                ['catch'](function () {
                  throw Unauthorized('User not found. Please sign up')
                })

            case 3:
              user = _context9.sent
              _context9.next = 6
              return _bcryptjs['default'].compare(body.password, user.password)

            case 6:
              isValid = _context9.sent

              if (isValid) {
                _context9.next = 9
                break
              }

              throw Unauthorized('Unauthorized, invalid password')

            case 9:
              if (user.active) {
                _context9.next = 13
                break
              }

              return _context9.abrupt(
                'return',
                _objectSpread(
                  {
                    status: status,
                    message:
                      'User account inactive, please verify your phone number to continue'
                  },
                  user
                )
              )

            case 13:
              return _context9.abrupt(
                'return',
                _objectSpread(
                  _objectSpread(
                    {
                      status: status,
                      message: message
                    },
                    user
                  ),
                  {},
                  {
                    token: _JwtService['default'].sign(_objectSpread({}, user))
                  }
                )
              )

            case 14:
            case 'end':
              return _context9.stop()
          }
        }
      }, _callee9)
    })
  )

  return function login(_x10) {
    return _ref9.apply(this, arguments)
  }
})()

exports.login = login

var verifyUser = /*#__PURE__*/ (function () {
  var _ref10 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee10(ctx) {
      var body, user_data
      return _regenerator['default'].wrap(function _callee10$(_context10) {
        while (1) {
          switch ((_context10.prev = _context10.next)) {
            case 0:
              body = ctx.request.body
              body.active = true
              _context10.next = 4
              return _user['default']
                .query()
                .patchAndFetchById(body.user_id, body)
                .withGraphFetched('[role]')

            case 4:
              user_data = _context10.sent
              return _context10.abrupt(
                'return',
                _objectSpread(
                  _objectSpread(
                    {
                      status: status,
                      message: message
                    },
                    user_data
                  ),
                  {},
                  {
                    token: _JwtService['default'].sign(_objectSpread({}, user))
                  }
                )
              )

            case 6:
            case 'end':
              return _context10.stop()
          }
        }
      }, _callee10)
    })
  )

  return function verifyUser(_x11) {
    return _ref10.apply(this, arguments)
  }
})()

exports.verifyUser = verifyUser
//# sourceMappingURL=auth.controller.js.map
