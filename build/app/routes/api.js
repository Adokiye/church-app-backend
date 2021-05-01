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

var _mealCategoryValidator = _interopRequireDefault(require("../validators/meal-category-validator"));

var _mealValidator = _interopRequireDefault(require("../validators/meal-validator"));

var _logisticsValidator = _interopRequireDefault(require("../validators/logistics-validator"));

var _dealValidator = _interopRequireDefault(require("../validators/deal-validator"));

var _keywordValidator = _interopRequireDefault(require("../validators/keyword-validator"));

var _userSettingsValidator = _interopRequireDefault(require("../validators/user-settings-validator"));

var _faqValidator = _interopRequireDefault(require("../validators/faq-validator"));

var _appFeedbackValidator = _interopRequireDefault(require("../validators/app-feedback-validator"));

var _cokitchenExploreKeywordValidator = _interopRequireDefault(require("../validators/cokitchen-explore-keyword-validator"));

var _orderValidator = _interopRequireDefault(require("../validators/order-validator"));

var router = new _koaRouter["default"](); //authentication and user routes

router.put('/auth/user', _userValidator["default"].update(), _controllers.Auth.update);
router.get('/me', _controllers.Auth.me);
router.post('/app-feedback', _appFeedbackValidator["default"].createAppFeedback(), _controllers.AppFeedback.createAppFeedback);
router.post('/auth/update-device-token', _userValidator["default"].updateDeviceToken(), _controllers.Auth.updateDeviceToken);
router.post('/auth/guest/authenticate', _userValidator["default"].create(), _controllers.Auth.verifyOtp, _controllers.Auth.create);
router.post('/auth/guest/find-username', _userValidator["default"].checkForUsername(), _controllers.Auth.findUserName);
router.post('/auth/login', _userValidator["default"].login(), _controllers.Auth.login);
router.post('/auth/login-marketing', _userValidator["default"].login(), _controllers.Auth.loginMarketing);
router.post('/auth/login-logistics-admin', _userValidator["default"].login(), _controllers.Auth.loginLogisticsAdmin);
router.post('/internal/auth/register-marketing', _userValidator["default"].registerStaff(), _controllers.Auth.registerAsMarketing);
router.post('/internal/auth/register-logistics-admin', _userValidator["default"].registerStaff(), _controllers.Auth.registerAsLogisticsAdmin);
router.post('/auth/verify', _userValidator["default"].verifyUser(), _controllers.Auth.verifyOtp, _controllers.Auth.verifyUser); //user settings routes

router.put('/user-settings', _userSettingsValidator["default"].updateUserSettings(), _controllers.UserSettings.updateUserSettings);
router.get('/user-settings', _controllers.UserSettings.getUserSettings); //user saved address routes

router.post('/user-saved-address', _userSettingsValidator["default"].createUserAddress(), _controllers.UserSettings.createNewAddress);
router.get('/user-saved-address', _controllers.UserSettings.getSavedAddress);
router.put('/user-saved-address', _controllers.UserSettings.updateAddress);
router.del('/user-saved-address/:id', _userSettingsValidator["default"].deleteUserAddress(), _controllers.UserSettings.deleteAddress); //send otp

router.post('/internal/send-otp', _userValidator["default"].send_otp(), _controllers.Auth.sendOtp); //admin routes

router.post('/admin/update-user', _controllers.Auth.adminUpdateUser);
router.get('/admin/get-users', _controllers.Auth.adminGetUsers);
router.get('/admin/get-user-roles', _controllers.Auth.adminGetUserRoles); //marketing routes

router.put('/marketing/cokitchen', _cokitchenValidator["default"].update(), _controllers.Cokitchen.updateCokitchen);
router.post('/marketing/cokitchen-explore-keyword', _cokitchenExploreKeywordValidator["default"].create(), _controllers.CokitchenExploreKeyword.createCokitchenExploreKeyword);
router.get('/internal/cokitchen-explore-keyword', _controllers.CokitchenExploreKeyword.getCokitchenExploreKeywords);
router.del('/marketing/cokitchen-explore-keyword/:id', _cokitchenExploreKeywordValidator["default"]["delete"](), _controllers.CokitchenExploreKeyword.deleteCokitchenExploreKeyword);
router.post('/marketing/faq', _faqValidator["default"].createFaq(), _controllers.Faq.addNewFaq);
router.del('/marketing/faq/:id', _faqValidator["default"].deleteFaq(), _controllers.Faq.deleteFaq);
router.put('/marketing/faq', _faqValidator["default"].updateFaq(), _controllers.Faq.updateFaq);
router.get('/marketing/faq-arrangement', _controllers.Faq.getFaqArrangement);
router.put('/marketing/faq-arrangement', _faqValidator["default"].updateFaqArrangment(), _controllers.Faq.updateFaqArrangement);
router.get('/marketing/app-feedback', _controllers.AppFeedback.getAppFeedbacks);
router.post('/marketing/cokitchen-polygon', _cokitchenPolygonValidator["default"].create(), _controllers.Cokitchen.createCokitchenPolygon);
router.put('/marketing/cokitchen-polygon', _cokitchenPolygonValidator["default"].update(), _controllers.Cokitchen.updateCokitchenPolygon);
router.del('/marketing/cokitchen-polygon/:id', _cokitchenPolygonValidator["default"]["delete"](), _controllers.Cokitchen.deleteCokitchenPolygon);
router.get('/internal/cokitchen', _controllers.Cokitchen.getAllCokitchens);
router.get('/internal/brand', _controllers.Brand.getBrandsForMarketing);
router.post('/marketing/admin/create-marketing-staff', _userValidator["default"].createMarketingStaff(), _controllers.Auth.marketingCreateStaff);
router.post('/marketing/deal', _dealValidator["default"].createDeal(), _controllers.Deals.createDeal);
router.post('/marketing/post', _dealValidator["default"].createPost(), _controllers.Deals.createPost);
router.put('/marketing/home-page-header', _dealValidator["default"].updateCokitchenPostsArrangement(), _controllers.Deals.updatePostsArrangement);
router.put('/marketing/deal/:id', _dealValidator["default"].updateDeal(), _controllers.Deals.updateDeal);
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
router.put('/marketing/keyword', _keywordValidator["default"].update(), _controllers.Keyword.updateKeyword);
router.get('/internal/deal-types', _controllers.Deals.getDealTypes);
router.get('/internal/cokitchen/deal', _controllers.Deals.getCokitchenDeals);
router.get('/internal/cokitchen/home-page-header', _controllers.Deals.getCokitchenHomePagePosts); // brand details marketing

router.post('/marketing/brand', _brandValidator["default"].createBrand(), _controllers.Brand.createBrand);
router.get('/marketing/user', _controllers.Auth.getAllUsers);
router.put('/marketing/brand', _brandValidator["default"].updateBrand(), _controllers.Brand.updateBrand);
router.put('/marketing/meal-category', _mealCategoryValidator["default"].updateMealCategory(), _controllers.MealCategory.updateMealCategory);
router.put('/marketing/meal', _mealValidator["default"].updateMeal(), _controllers.Meal.updateMeal);
router.post('/internal/meal-addon', _mealValidator["default"].getMealAddons(), _controllers.Meal.getMealAddons);
router.get('/internal/meal', _controllers.Meal.getMeals);
router.get('/internal/meal-category', _controllers.MealCategory.getMealCategories);
router.get('/internal/meal-category-selection-type', _controllers.MealCategory.getMealCategorySelectionTypes); // user brand routes,

router.post('/internal/brands', _brandValidator["default"].getUserBrands(), _controllers.Brand.getBrandsForCustomer);
router.post('/internal/meal-keywords', _brandValidator["default"].getUserBrands(), _controllers.Keyword.getUserMealKeywords); //logistics routes

router.post('/logistics/admin/create-logistics-company', _logisticsValidator["default"].createLogisticsCompany(), _controllers.Logistics.createLogisticsCompany);
router.post('/logistics/admin/create-logistics-admin', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsAdmin);
router.post('/logistics/create-logistics-rider', _logisticsValidator["default"].createLogisticsStaff(), _controllers.Logistics.createLogisticsRider); //orders

router.post('/order/calculate', _orderValidator["default"].calculateOrder(), _controllers.Order.calculateOrder);
router.post('/order', _orderValidator["default"].createOrder(), _controllers.Order.createOrder);
router.get('/order/order-types', _controllers.Order.getOrderTypes);

var _default = router.routes();

exports["default"] = _default;
//# sourceMappingURL=api.js.map