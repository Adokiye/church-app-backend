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

var _keywordValidator = _interopRequireDefault(require("../validators/keyword-validator"));

var router = new _koaRouter["default"](); //authentication and user routes

router.put('/auth/user', _userValidator["default"].update(), _controllers.Auth.update);
router.post('/auth/guest/authenticate', _userValidator["default"].create(), _controllers.Auth.verifyOtp, _controllers.Auth.create);
router.post('/auth/guest/find-username', _userValidator["default"].checkForUsername(), _controllers.Auth.findUserName);
router.post('/auth/login', _userValidator["default"].login(), _controllers.Auth.login);
router.post('/auth/login-marketing', _userValidator["default"].login(), _controllers.Auth.loginMarketing);
router.post('/auth/login-logistics-admin', _userValidator["default"].login(), _controllers.Auth.loginLogisticsAdmin);
router.post('/internal/auth/register-marketing', _userValidator["default"].registerStaff(), _controllers.Auth.registerAsMarketing);
router.post('/internal/auth/register-logistics-admin', _userValidator["default"].registerStaff(), _controllers.Auth.registerAsLogisticsAdmin);
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
router.post('/marketing/create-brand-business-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createBrandBusinessMetadata);
router.post('/marketing/delete-brand-business-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteBrandBusinessMetadata);
router.post('/marketing/create-brand-descriptive-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createBrandDescriptiveMetadata);
router.post('/marketing/delete-brand-descriptive-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteBrandDescriptiveMetadata);
router.post('/marketing/create-brand-tag', _keywordValidator["default"].create(), _controllers.Keyword.createBrandTag);
router.post('/marketing/delete-brand-tag', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteBrandTag);
router.post('/marketing/create-brand-keyword', _keywordValidator["default"].create(), _controllers.Keyword.createBrandKeyword);
router.post('/marketing/delete-brand-keyword', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteBrandKeyword);
router.post('/marketing/create-meal-business-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createMealBusinessMetadata);
router.post('/marketing/delete-meal-business-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealBusinessMetadata);
router.post('/marketing/create-meal-descriptive-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createMealDescriptiveMetadata);
router.post('/marketing/delete-meal-descriptive-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealDescriptiveMetadata);
router.post('/marketing/create-meal-tag', _keywordValidator["default"].create(), _controllers.Keyword.createMealTag);
router.post('/marketing/delete-meal-tag', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealTag);
router.post('/marketing/create-meal-keyword', _keywordValidator["default"].create(), _controllers.Keyword.createMealKeyword);
router.post('/marketing/delete-meal-keyword', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealKeyword);
router.post('/marketing/create-meal-dietary-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createMealDietaryMetadata);
router.post('/marketing/delete-meal-dietary-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealDietaryMetadata);
router.post('/marketing/create-meal-allergy-metadata', _keywordValidator["default"].create(), _controllers.Keyword.createMealAllergyMetadata);
router.post('/marketing/delete-meal-allergy-metadata', _keywordValidator["default"]["delete"](), _controllers.Keyword.deleteMealAllergyMetadata);
router.get('/marketing/keywords', _controllers.Keyword.getAllKeywords);
router.get('/marketing/get-all-deal-types', _controllers.Deals.getDealTypes); // user brand routes,

router.post('/internal/brands', _brandValidator["default"].getUserBrands(), _controllers.Brand.getBrandsForCustomer); //logistics routes

router.post('/logistics/admin/create-logistics-company', _logisticsValidator["default"].createLogisticsCompany(), _controllers.Logistics.createLogisticsCompany);
router.post('/logistics/admin/create-logistics-admin', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsAdmin);
router.post('/logistics/create-logistics-rider', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsRider);

var _default = router.routes();

exports["default"] = _default;
//# sourceMappingURL=api.js.map