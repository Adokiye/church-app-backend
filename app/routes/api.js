import Router from 'koa-router'
import {Auth, Cokitchen, Brand} from '../controllers/'
import {
  UserValidator,
  CokitchenValidator,
  CokitchenPolygonValidator,
  BrandValidator
} from '../validators/'

const router = new Router()

//authentication and user routes
router.put('/user',UserValidator.update(), Auth.update)

router.post('/guest/authenticate', UserValidator.create(), Auth.verifyOtp, Auth.create)

router.post(
  '/internal/send-otp',
  Auth.sendOtp
)

//marketing routes
router.put('/marketing/update-cokitchen/:id', CokitchenValidator.update(), Cokitchen.updateCokitchen)

router.put('/marketing/update-cokitchen-polygon/:id', CokitchenPolygonValidator.update(), Brand.updateBrand)

router.post('/marketing/create-cokitchen-polygon', CokitchenPolygonValidator.create(), Cokitchen.createCokitchenPolygon)

router.put('/marketing/update-cokitchen-polygon/:id', CokitchenPolygonValidator.update(), Cokitchen.updateCokitchenPolygon)

router.get('/internal/cokitchens', Cokitchen.getAllCokitchens )

// user brand routes,
router.post('/internal/brands',BrandValidator.getUserBrands(), Brand.getBrandsForCustomer)




export default router.routes()
