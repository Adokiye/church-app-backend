import Router from 'koa-router'
import {
  Auth,
  Cokitchen,
  Brand,
  Logistics,
  Deals,
  Order,
  Keyword,
  UserSettings
} from '../controllers/'
import UserValidator from '../validators/user-validator'
import CokitchenValidator from '../validators/cokitchen-validator'
import CokitchenPolygonValidator from '../validators/cokitchen-polygon-validator'
import BrandValidator from '../validators/brand-validator'
import LogisticsValidator from '../validators/logistics-validator'
import DealsValidator from '../validators/deal-validator'
import KeywordValidator from '../validators/keyword-validator'
import UserSettingsValidator from '../validators/user-settings-validator'

const router = new Router()

//authentication and user routes
router.put('/auth/user', UserValidator.update(), Auth.update)

router.post('/auth/update-device-token', UserValidator.updateDeviceToken(), Auth.updateDeviceToken)

router.post(
  '/auth/guest/authenticate',
  UserValidator.create(),
  Auth.verifyOtp,
  Auth.create
)

router.post(
  '/auth/guest/find-username',
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
router.put('/user-settings', UserSettingsValidator.updateUserSettings(), UserSettings.updateUserSettings)

router.get('/user-settings', UserSettings.getUserSettings)

router.post('/internal/send-otp', UserValidator.send_otp(), Auth.sendOtp)

//admin routes
router.post('/admin/update-user', Auth.adminUpdateUser)

router.get('/admin/get-users', Auth.adminGetUsers)

router.get('/admin/get-user-roles', Auth.adminGetUserRoles)

//marketing routes
router.put(
  '/marketing/update-cokitchen/:id',
  CokitchenValidator.update(),
  Cokitchen.updateCokitchen
)

router.put(
  '/marketing/update-cokitchen-polygon/:id',
  CokitchenPolygonValidator.update(),
  Brand.updateBrand
)

router.post(
  '/marketing/create-cokitchen-polygon',
  CokitchenPolygonValidator.create(),
  Cokitchen.createCokitchenPolygon
)

router.put(
  '/marketing/update-cokitchen-polygon/:id',
  CokitchenPolygonValidator.update(),
  Cokitchen.updateCokitchenPolygon
)

router.get('/internal/cokitchens', Cokitchen.getAllCokitchens)

router.post(
  '/marketing/admin/create-marketing-staff',
  UserValidator.createMarketingStaff(),
  Auth.marketingCreateStaff
)

router.post(
  '/marketing/create-deal',
  DealsValidator.createDeal(),
  Deals.createDeal
)

router.put(
  '/marketing/update-deal/:id',
  DealsValidator.updateDeal(),
  Deals.updateDeal
)

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

router.get('/marketing/get-all-deal-types', Deals.getDealTypes)

// user brand routes,
router.post(
  '/internal/brands',
  BrandValidator.getUserBrands(),
  Brand.getBrandsForCustomer
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

export default router.routes()
