import Router from 'koa-router'
import {Auth, Cokitchen, Brand, Logistics, Deals} from '../controllers/'
import {
  UserValidator,
  CokitchenValidator,
  CokitchenPolygonValidator,
  BrandValidator,
  LogisticsValidator,
  DealsValidator
} from '../validators/'

const router = new Router()

//authentication and user routes
router.put('/user',UserValidator.update(), Auth.update)

router.post('/guest/authenticate', UserValidator.create(), Auth.verifyOtp, Auth.create)

router.post(
  '/internal/send-otp',
  Auth.sendOtp
)

//admin routes
router.post('/admin/update-user',Auth.adminUpdateUser)

router.get('/admin/get-users', Auth.adminGetUsers)

router.get('/admin/get-user-roles', Auth.adminGetUserRoles)


//marketing routes
router.put('/marketing/update-cokitchen/:id', CokitchenValidator.update(), Cokitchen.updateCokitchen)

router.put('/marketing/update-cokitchen-polygon/:id', CokitchenPolygonValidator.update(), Brand.updateBrand)

router.post('/marketing/create-cokitchen-polygon', CokitchenPolygonValidator.create(), Cokitchen.createCokitchenPolygon)

router.put('/marketing/update-cokitchen-polygon/:id', CokitchenPolygonValidator.update(), Cokitchen.updateCokitchenPolygon)

router.get('/internal/cokitchens', Cokitchen.getAllCokitchens )

router.post('/marketing/admin/create-marketing-staff',UserValidator.createMarketingStaff(),Auth.marketingCreateStaff)

router.post('/marketing/create-deal',DealsValidator.createDeal(), Deals.createDeal)

router.put('/marketing/update-deal/:id',DealsValidator.updateDeal(), Deals.updateDeal)

router.get('/marketing/get-all-deal-types', Deals.getDealTypes)

// user brand routes,
router.post('/internal/brands',BrandValidator.getUserBrands(), Brand.getBrandsForCustomer)


//logistics routes
router.post('/logistics/admin/create-logistics-company',LogisticsValidator.createLogisticsCompany(), Logistics.createLogisticsCompany)

router.post('/logistics/admin/create-logistics-admin',LogisticsValidator.createLogisticsAdmin(), Logistics.createLogisticsAdmin)

router.post('/logistics/create-logistics-rider',LogisticsValidator.createLogisticsStaff(), Logistics.createLogisticsRider)


export default router.routes()
