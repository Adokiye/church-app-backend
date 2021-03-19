'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports[
  'default'
] = exports.MAIL_TYPE = exports.PORT = exports.IS_TEST = exports.IS_PRODUCTION = exports.IS_DEVELOPMENT = exports.NODE_ENV = exports.env = void 0

var _path = _interopRequireDefault(require('path'))

var _dotenv = _interopRequireDefault(require('dotenv'))

var rootDirectory = _path['default'].resolve(__dirname, '..', '..')

_dotenv['default'].config({
  path: _path['default'].resolve(rootDirectory, '.env')
})
/**
 * Get environment variable from process.env
 * @param {string} key The key of the environment variable
 * @param {*} defaultValue A default value if the environment variable
 * is not found
 *
 * @throws {Error} Will throw an error if the key not found in process.env
 * and no default value is received
 *
 * @returns {*} The variable value or the defaultValue
 */

var env = function env(key, defaultValue) {
  if (!defaultValue && !process.env[key]) {
    throw Error(
      'Environment variable '.concat(
        key,
        ' not defined and no default value was received'
      )
    )
  }

  return process.env[key] || defaultValue
}
/**
 * Node environment
 * @constant {string}
 */

exports.env = env
var NODE_ENV = env('NODE_ENV', 'development')
/**
 * @constant {boolean}
 */

exports.NODE_ENV = NODE_ENV
var IS_DEVELOPMENT = NODE_ENV === 'development'
/**
 * @constant {boolean}
 */

exports.IS_DEVELOPMENT = IS_DEVELOPMENT
var IS_PRODUCTION = NODE_ENV === 'production'
/**
 * @constant {boolean}
 */

exports.IS_PRODUCTION = IS_PRODUCTION
var IS_TEST = NODE_ENV === 'test'
/**
 * Port that the node server will run on
 * @constant {number}
 */

exports.IS_TEST = IS_TEST
var PORT = env('PORT', 3000)
/**
 * Email authenticate type used by nodemailer
 * @constant {string}
 */

exports.PORT = PORT
var MAIL_TYPE = env('MAIL_TYPE', 'gmail')
/**
 * List of emails allowed to use
 * @constant {string}
 */

exports.MAIL_TYPE = MAIL_TYPE
var _default = env
exports['default'] = _default
//# sourceMappingURL=env.js.map
