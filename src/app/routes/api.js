import Router from 'koa-router'

import {
  Auth,
  Cokitchen,
  Brand,
  Logistics,
  Deals,
  Order,
  Keyword,
  UserSettings,
  Faq,
  AppFeedback,
  Meal,
  MealCategory,
  CokitchenExploreKeyword
} from '../controllers/'

import UserValidator from '../validators/user-validator'
import CokitchenValidator from '../validators/cokitchen-validator'
import CokitchenPolygonValidator from '../validators/cokitchen-polygon-validator'
import BrandValidator from '../validators/brand-validator'
import MealCategoryValidator from '../validators/meal-category-validator'
import MealValidator from '../validators/meal-validator'
import LogisticsValidator from '../validators/logistics-validator'
import DealsValidator from '../validators/deal-validator'
import KeywordValidator from '../validators/keyword-validator'
import UserSettingsValidator from '../validators/user-settings-validator'
import FaqValidator from '../validators/faq-validator'
import AppFeedbackValidator from '../validators/app-feedback-validator'
import CokitchenExploreKeywordValidator from '../validators/cokitchen-explore-keyword-validator'
import OrderValidator from '../validators/order-validator'

const router = new Router()

//authentication and user routes
router.put('/auth/user', UserValidator.update(), Auth.update)

router.get('/me', Auth.me)

router.post(
  '/app-feedback',
  AppFeedbackValidator.createAppFeedback(),
  AppFeedback.createAppFeedback
)

router.post(
  '/auth/update-device-token',
  UserValidator.updateDeviceToken(),
  Auth.updateDeviceToken
)

router.post(
  '/auth/guest/authenticate',
  UserValidator.create(),
  Auth.verifyOtp,
  Auth.create
)

router.post(
  '/internal/find-username',
  UserValidator.checkForUsername(),
  Auth.findUserName
)

router.post('/auth/login', UserValidator.login(), Auth.login)

router.post('/auth/login-marketing', UserValidator.login(), Auth.loginMarketing)

router.post(
  '/auth/login-logistics-admin',
  UserValidator.login(),
  Auth.loginLogisticsAdmin
)

router.post(
  '/internal/auth/register-marketing',
  UserValidator.registerStaff(),
  Auth.registerAsMarketing
)

router.post(
  '/internal/auth/register-logistics-admin',
  UserValidator.registerStaff(),
  Auth.registerAsLogisticsAdmin
)

router.post(
  '/auth/verify',
  UserValidator.verifyUser(),
  Auth.verifyOtp,
  Auth.verifyUser
)

//user settings routes
router.put(
  '/user-settings',
  UserSettingsValidator.updateUserSettings(),
  UserSettings.updateUserSettings
)

router.get('/user-settings', UserSettings.getUserSettings)

//user saved address routes
router.post(
  '/user-saved-address',
  UserSettingsValidator.createUserAddress(),
  UserSettings.createNewAddress
)

router.get('/user-saved-address', UserSettings.getSavedAddress)

router.put('/user-saved-address', UserSettings.updateAddress)

router.del(
  '/user-saved-address/:id',
  UserSettingsValidator.deleteUserAddress(),
  UserSettings.deleteAddress
)

//send otp
router.post('/internal/send-otp', UserValidator.send_otp(), Auth.sendOtp)

//admin routes
router.post('/admin/update-user', Auth.adminUpdateUser)

router.get('/admin/get-users', Auth.adminGetUsers)

router.get('/admin/get-user-roles', Auth.adminGetUserRoles)

//marketing routes
router.put(
  '/marketing/cokitchen',
  CokitchenValidator.update(),
  Cokitchen.updateCokitchen
)

router.post(
  '/marketing/cokitchen-explore-keyword',
  CokitchenExploreKeywordValidator.create(),
  CokitchenExploreKeyword.createCokitchenExploreKeyword
)

router.get(
  '/internal/cokitchen-explore-keyword',
  CokitchenExploreKeyword.getCokitchenExploreKeywords
)

router.del(
  '/marketing/cokitchen-explore-keyword/:id',
  CokitchenExploreKeywordValidator.delete(),
  CokitchenExploreKeyword.deleteCokitchenExploreKeyword
)

router.post('/marketing/faq', FaqValidator.createFaq(), Faq.addNewFaq)

router.del('/marketing/faq/:id', FaqValidator.deleteFaq(), Faq.deleteFaq)

router.put('/marketing/faq', FaqValidator.updateFaq(), Faq.updateFaq)

router.get('/marketing/faq-arrangement', Faq.getFaqArrangement)

router.put(
  '/marketing/faq-arrangement',
  FaqValidator.updateFaqArrangment(),
  Faq.updateFaqArrangement
)

router.get('/marketing/app-feedback', AppFeedback.getAppFeedbacks)

router.post(
  '/marketing/cokitchen-polygon',
  CokitchenPolygonValidator.create(),
  Cokitchen.createCokitchenPolygon
)

router.put(
  '/marketing/cokitchen-polygon',
  CokitchenPolygonValidator.update(),
  Cokitchen.updateCokitchenPolygon
)

router.del(
  '/marketing/cokitchen-polygon/:id',
  CokitchenPolygonValidator.delete(),
  Cokitchen.deleteCokitchenPolygon
)

router.get('/internal/cokitchen', Cokitchen.getAllCokitchens)

router.get('/internal/brand', Brand.getBrandsForMarketing)

router.post(
  '/marketing/admin/create-marketing-staff',
  UserValidator.createMarketingStaff(),
  Auth.marketingCreateStaff
)

router.post('/marketing/deal', DealsValidator.createDeal(), Deals.createDeal)

router.post('/marketing/post', DealsValidator.createPost(), Deals.createPost)

router.put('/marketing/home-page-header', DealsValidator.updateCokitchenPostsArrangement(), Deals.updatePostsArrangement)

router.put('/marketing/deal/:id', DealsValidator.updateDeal(), Deals.updateDeal)

router.post(
  '/marketing/create-brand-business-metadata',
  KeywordValidator.create(),
  Keyword.createBrandBusinessMetadata
)

router.post(
  '/marketing/delete-brand-business-metadata',
  KeywordValidator.delete(),
  Keyword.deleteBrandBusinessMetadata
)

router.post(
  '/marketing/create-brand-descriptive-metadata',
  KeywordValidator.create(),
  Keyword.createBrandDescriptiveMetadata
)

router.post(
  '/marketing/delete-brand-descriptive-metadata',
  KeywordValidator.delete(),
  Keyword.deleteBrandDescriptiveMetadata
)

router.post(
  '/marketing/create-brand-tag',
  KeywordValidator.create(),
  Keyword.createBrandTag
)

router.post(
  '/marketing/delete-brand-tag',
  KeywordValidator.delete(),
  Keyword.deleteBrandTag
)

router.post(
  '/marketing/create-brand-keyword',
  KeywordValidator.create(),
  Keyword.createBrandKeyword
)

router.post(
  '/marketing/delete-brand-keyword',
  KeywordValidator.delete(),
  Keyword.deleteBrandKeyword
)

router.post(
  '/marketing/create-meal-business-metadata',
  KeywordValidator.create(),
  Keyword.createMealBusinessMetadata
)

router.post(
  '/marketing/delete-meal-business-metadata',
  KeywordValidator.delete(),
  Keyword.deleteMealBusinessMetadata
)

router.post(
  '/marketing/create-meal-descriptive-metadata',
  KeywordValidator.create(),
  Keyword.createMealDescriptiveMetadata
)

router.post(
  '/marketing/delete-meal-descriptive-metadata',
  KeywordValidator.delete(),
  Keyword.deleteMealDescriptiveMetadata
)

router.post(
  '/marketing/create-meal-tag',
  KeywordValidator.create(),
  Keyword.createMealTag
)

router.post(
  '/marketing/delete-meal-tag',
  KeywordValidator.delete(),
  Keyword.deleteMealTag
)

router.post(
  '/marketing/create-meal-keyword',
  KeywordValidator.create(),
  Keyword.createMealKeyword
)

router.post(
  '/marketing/delete-meal-keyword',
  KeywordValidator.delete(),
  Keyword.deleteMealKeyword
)

router.post(
  '/marketing/create-meal-dietary-metadata',
  KeywordValidator.create(),
  Keyword.createMealDietaryMetadata
)

router.post(
  '/marketing/delete-meal-dietary-metadata',
  KeywordValidator.delete(),
  Keyword.deleteMealDietaryMetadata
)

router.post(
  '/marketing/create-meal-allergy-metadata',
  KeywordValidator.create(),
  Keyword.createMealAllergyMetadata
)

router.post(
  '/marketing/delete-meal-allergy-metadata',
  KeywordValidator.delete(),
  Keyword.deleteMealAllergyMetadata
)

router.get('/marketing/keywords', Keyword.getAllKeywords)

router.put(
  '/marketing/keyword',
  KeywordValidator.update(),
  Keyword.updateKeyword
)

router.get('/internal/deal-types', Deals.getDealTypes)

router.get('/internal/cokitchen/deal', Deals.getCokitchenDeals)

router.get('/internal/cokitchen/home-page-header', Deals.getCokitchenHomePagePosts)

// brand details marketing
router.post('/marketing/brand', BrandValidator.createBrand(), Brand.createBrand)

router.get('/marketing/user', Auth.getAllUsers)

router.put('/marketing/brand', BrandValidator.updateBrand(), Brand.updateBrand)

router.put(
  '/marketing/meal-category',
  MealCategoryValidator.updateMealCategory(),
  MealCategory.updateMealCategory
)

router.put('/marketing/meal', MealValidator.updateMeal(), Meal.updateMeal)

router.post(
  '/internal/meal-addon',
  MealValidator.getMealAddons(),
  Meal.getMealAddons
)

router.get('/internal/meal', Meal.getMeals)

router.get('/internal/meal-category', MealCategory.getMealCategories)

router.get(
  '/internal/meal-category-selection-type',
  MealCategory.getMealCategorySelectionTypes
)

// user brand routes,
router.post(
  '/internal/brands',
  BrandValidator.getUserBrands(),
  Brand.getBrandsForCustomer
)

router.post(
  '/internal/meal-keywords',
  BrandValidator.getUserBrands(),
  Keyword.getUserMealKeywords
)

//logistics routes
router.post(
  '/logistics/admin/create-logistics-company',
  LogisticsValidator.createLogisticsCompany(),
  Logistics.createLogisticsCompany
)

router.post(
  '/logistics/admin/create-logistics-admin',
  LogisticsValidator.createLogisticsStaff(),
  Logistics.createLogisticsAdmin
)

router.post(
  '/logistics/create-logistics-rider',
  LogisticsValidator.createLogisticsStaff(),
  Logistics.createLogisticsRider
)

//orders
router.post(
  '/order/calculate',
  OrderValidator.calculateOrder(),
  Order.calculateOrder
)

router.post(
  '/order',
  OrderValidator.createOrder(),
  Order.createOrder
)

router.get(
  '/order/order-types',
  Order.getOrderTypes
)


export default router.routes()
