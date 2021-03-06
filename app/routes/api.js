import Router from 'koa-router'
import {Auth, } from '../controllers/'
import {
  UserValidator,
  CokitchenValidator,
  CokitchenPolygonValidator
} from '../validators/'

const router = new Router()

//authentication and user routes
router.put('/users/:id',UserValidator.update(), Auth.update)

router.post('/guest/authenticate', UserValidator.create(), Auth.verifyOtp, Auth.create)

router.post(
  '/internal/send-otp',
  Auth.sendOtp
)

//marketing routes



export default router.routes()
