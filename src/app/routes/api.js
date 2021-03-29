import Router from 'koa-router'
import { Auth, Cokitchen, Brand, Logistics, Deals } from '../controllers/'
import UserValidator from '../validators/user-validator'
import CokitchenValidator from '../validators/cokitchen-validator'
import CokitchenPolygonValidator from '../validators/cokitchen-polygon-validator'
import BrandValidator from '../validators/brand-validator'
import LogisticsValidator from '../validators/logistics-validator'
import DealsValidator from '../validators/deal-validator'

const router = new Router()

//authentication and user routes
router.put('/auth/user', UserValidator.update(), Auth.update)

router.post(
  '/auth/guest/authenticate',
  UserValidator.create(),
  Auth.verifyOtp,
  Auth.create
)

router.post('/auth/login', UserValidator.login(), Auth.login)

router.post('/auth/login-marketing', UserValidator.login(), Auth.loginMarketing)

router.post('/auth/login-logistics-admin', UserValidator.login(), Auth.loginLogisticsAdmin)


router.post(
  '/auth/verify',
  UserValidator.verifyUser(),
  Auth.verifyOtp,
  Auth.verifyUser
)

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
