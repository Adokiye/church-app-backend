"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = require("../controllers/");

var _userValidator = _interopRequireDefault(require("../validators/user-validator"));

var _cokitchenValidator = _interopRequireDefault(require("../validators/cokitchen-validator"));

var _cokitchenPolygonValidator = _interopRequireDefault(require("../validators/cokitchen-polygon-validator"));

var _brandValidator = _interopRequireDefault(require("../validators/brand-validator"));

var _logisticsValidator = _interopRequireDefault(require("../validators/logistics-validator"));

var _dealValidator = _interopRequireDefault(require("../validators/deal-validator"));

var router = new _koaRouter["default"](); //authentication and user routes

router.put('/auth/user', _userValidator["default"].update(), _controllers.Auth.update);
router.post('/auth/guest/authenticate', _userValidator["default"].create(), _controllers.Auth.verifyOtp, _controllers.Auth.create);
router.post('/auth/login', _userValidator["default"].login(), _controllers.Auth.login);
router.post('/auth/login-marketing', _userValidator["default"].login(), _controllers.Auth.loginMarketing);
router.post('/auth/login-logistics-admin', _userValidator["default"].login(), _controllers.Auth.loginLogisticsAdmin);
router.post('/auth/verify', _userValidator["default"].verifyUser(), _controllers.Auth.verifyOtp, _controllers.Auth.verifyUser);
router.post('/internal/send-otp', _userValidator["default"].send_otp(), _controllers.Auth.sendOtp); //admin routes

router.post('/admin/update-user', _controllers.Auth.adminUpdateUser);
router.get('/admin/get-users', _controllers.Auth.adminGetUsers);
router.get('/admin/get-user-roles', _controllers.Auth.adminGetUserRoles); //marketing routes

router.put('/marketing/update-cokitchen/:id', _cokitchenValidator["default"].update(), _controllers.Cokitchen.updateCokitchen);
router.put('/marketing/update-cokitchen-polygon/:id', _cokitchenPolygonValidator["default"].update(), _controllers.Brand.updateBrand);
router.post('/marketing/create-cokitchen-polygon', _cokitchenPolygonValidator["default"].create(), _controllers.Cokitchen.createCokitchenPolygon);
router.put('/marketing/update-cokitchen-polygon/:id', _cokitchenPolygonValidator["default"].update(), _controllers.Cokitchen.updateCokitchenPolygon);
router.get('/internal/cokitchens', _controllers.Cokitchen.getAllCokitchens);
router.post('/marketing/admin/create-marketing-staff', _userValidator["default"].createMarketingStaff(), _controllers.Auth.marketingCreateStaff);
router.post('/marketing/create-deal', _dealValidator["default"].createDeal(), _controllers.Deals.createDeal);
router.put('/marketing/update-deal/:id', _dealValidator["default"].updateDeal(), _controllers.Deals.updateDeal);
router.get('/marketing/get-all-deal-types', _controllers.Deals.getDealTypes); // user brand routes,

router.post('/internal/brands', _brandValidator["default"].getUserBrands(), _controllers.Brand.getBrandsForCustomer); //logistics routes

router.post('/logistics/admin/create-logistics-company', _logisticsValidator["default"].createLogisticsCompany(), _controllers.Logistics.createLogisticsCompany);
router.post('/logistics/admin/create-logistics-admin', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsAdmin);
router.post('/logistics/create-logistics-rider', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsRider);

var _default = router.routes();

exports["default"] = _default;
//# sourceMappingURL=api.js.map