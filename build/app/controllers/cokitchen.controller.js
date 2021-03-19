'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.getAllCokitchens = exports.updateCokitchenPolygon = exports.createCokitchenPolygon = exports.updateCokitchen = void 0

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _cokitchen = _interopRequireDefault(require('../models/cokitchen'))

var _cokitchen_polygon = _interopRequireDefault(
  require('../models/cokitchen_polygon')
)

var _RoleService = require('../services/RoleService')

var _helpers = require('../helpers')

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

var updateCokitchen = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(ctx) {
      var id, body, role, cokitchen_data
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              id = ctx.params.id
              body = ctx.request.body
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfMarketing)(role.name)) {
                _context.next = 11
                break
              }

              if (body.posist_data) {
                delete body.posist_data
              }

              _context.next = 7
              return _cokitchen['default']
                .query()
                .patchAndFetchById(id, body)
                .withGraphFetched('[brands, cokitchen_polygon]')

            case 7:
              cokitchen_data = _context.sent
              return _context.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  cokitchen_data
                )
              )

            case 11:
              throw (0, _helpers.Unauthorized)('Unauthorized Update')

            case 12:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function updateCokitchen(_x) {
    return _ref.apply(this, arguments)
  }
})()

exports.updateCokitchen = updateCokitchen

var createCokitchenPolygon = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee2(ctx) {
      var body, _ctx$state$user, id, role, cokitchen_polygon_data

      return _regenerator['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              body = ctx.request.body
              ;(_ctx$state$user = ctx.state.user),
                (id = _ctx$state$user.id),
                (role = _ctx$state$user.role)

              if (!(0, _RoleService.checkIfMarketing)(role.name)) {
                _context2.next = 9
                break
              }

              _context2.next = 5
              return _cokitchen_polygon['default']
                .query()
                .insert(body)
                .withGraphFetched('[cokitchen]')

            case 5:
              cokitchen_polygon_data = _context2.sent
              return _context2.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  cokitchen_polygon_data
                )
              )

            case 9:
              throw (0, _helpers.Unauthorized)('Unauthorized')

            case 10:
            case 'end':
              return _context2.stop()
          }
        }
      }, _callee2)
    })
  )

  return function createCokitchenPolygon(_x2) {
    return _ref2.apply(this, arguments)
  }
})()

exports.createCokitchenPolygon = createCokitchenPolygon

var updateCokitchenPolygon = /*#__PURE__*/ (function () {
  var _ref3 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee3(ctx) {
      var id, body, role, cokitchen_polygon_data
      return _regenerator['default'].wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              id = ctx.params.id
              body = ctx.request.body
              role = ctx.state.user.role

              if (!(0, _RoleService.checkIfMarketing)(role.name)) {
                _context3.next = 10
                break
              }

              _context3.next = 6
              return _cokitchen_polygon['default']
                .query()
                .patchAndFetchById(id, body)
                .withGraphFetched('[cokitchen]')

            case 6:
              cokitchen_polygon_data = _context3.sent
              return _context3.abrupt(
                'return',
                _objectSpread(
                  {
                    status: 'success',
                    message: 'Update Successful'
                  },
                  cokitchen_polygon_data
                )
              )

            case 10:
              throw (0, _helpers.Unauthorized)('Unauthorized Update')

            case 11:
            case 'end':
              return _context3.stop()
          }
        }
      }, _callee3)
    })
  )

  return function updateCokitchenPolygon(_x3) {
    return _ref3.apply(this, arguments)
  }
})()

exports.updateCokitchenPolygon = updateCokitchenPolygon

var getAllCokitchens = /*#__PURE__*/ (function () {
  var _ref4 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee4(ctx) {
      var cokitchens
      return _regenerator['default'].wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              _context4.next = 2
              return _cokitchen['default']
                .query()
                .withGraphFetched('[brands,cokitchen_polygons]')

            case 2:
              cokitchens = _context4.sent
              return _context4.abrupt('return', {
                status: 'success',
                cokitchens: cokitchens
              })

            case 4:
            case 'end':
              return _context4.stop()
          }
        }
      }, _callee4)
    })
  )

  return function getAllCokitchens(_x4) {
    return _ref4.apply(this, arguments)
  }
})()

exports.getAllCokitchens = getAllCokitchens
//# sourceMappingURL=cokitchen.controller.js.map
