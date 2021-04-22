"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POSIST_TOKEN = exports.POSIST_API_URL = exports.AFRICA_TALKING_API_KEY = exports.AFRICA_TALKING_USERNAME = exports.CONFIRM_EMAIL_EXPIRE = exports.OTP_TOKEN_EXPIRE = exports.APP_KEY = exports.PAYSTACK_SECRET = exports.EXPIRE_TIME = exports.URL_FRONT = exports.NODE_ENV = exports.DATABASE_TEST = exports.DATABASE = exports.PORT = exports.JWT_SECRET = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

_dotenv["default"].config({
  path: _path["default"].resolve(__dirname, '../.env')
});

var JWT_SECRET = process.env.SECRET || 'fb613016-662f-4ccc-b0e2-135304d8fba9';
exports.JWT_SECRET = JWT_SECRET;
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var DATABASE = process.env.DATABASE_URL;
exports.DATABASE = DATABASE;
var DATABASE_TEST = process.env.DATABASE_TEST || 'postgres://USER:PASSWORD@localhost:5432/DATABASE_TEST';
exports.DATABASE_TEST = DATABASE_TEST;
var NODE_ENV = process.env.NODE_ENV || 'development';
exports.NODE_ENV = NODE_ENV;
var URL_FRONT = process.env.URL_FRONT || 'https://getfoodcourt.com';
exports.URL_FRONT = URL_FRONT;
var EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || '14d';
exports.EXPIRE_TIME = EXPIRE_TIME;
var PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || 'sk_test_115e129503be252474b3f1e17009dba14246a4cc';
exports.PAYSTACK_SECRET = PAYSTACK_SECRET;
var APP_KEY = process.env.APP_KEY;
exports.APP_KEY = APP_KEY;
var OTP_TOKEN_EXPIRE = process.env.OTP_TOKEN_EXPIRE;
exports.OTP_TOKEN_EXPIRE = OTP_TOKEN_EXPIRE;
var CONFIRM_EMAIL_EXPIRE = process.env.CONFIRM_EMAIL_EXPIRE;
exports.CONFIRM_EMAIL_EXPIRE = CONFIRM_EMAIL_EXPIRE;
var AFRICA_TALKING_USERNAME = process.env.AFRICA_TALKING_USERNAME;
exports.AFRICA_TALKING_USERNAME = AFRICA_TALKING_USERNAME;
var AFRICA_TALKING_API_KEY = process.env.AFRICA_TALKING_API_KEY;
exports.AFRICA_TALKING_API_KEY = AFRICA_TALKING_API_KEY;
var POSIST_API_URL = 'http://posistapi.com/api/v1/';
exports.POSIST_API_URL = POSIST_API_URL;
var POSIST_TOKEN = process.env.POSIST_TOKEN;
exports.POSIST_TOKEN = POSIST_TOKEN;
//# sourceMappingURL=config.js.map