"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = require("../controllers/");

var _userValidator = _interopRequireDefault(require("../validators/user-validator"));

var router = new _koaRouter["default"](); //authentication and user routes

router.put('/auth/user', _userValidator["default"].update(), _controllers.Auth.update);
router.get('/me', _controllers.Auth.me);
router.post('/auth/update-device-token', _userValidator["default"].updateDeviceToken(), _controllers.Auth.updateDeviceToken);
router.post('/auth/guest/authenticate', _userValidator["default"].create(), _controllers.Auth.verifyOtp, _controllers.Auth.create);
router.post('/auth/login', _userValidator["default"].login(), _controllers.Auth.login);

var _default = router.routes();

exports["default"] = _default;
//# sourceMappingURL=api.js.map