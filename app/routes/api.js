import Router from 'koa-router'
import {Auth, } from '../controllers/'
import {
  UserValidator,
} from '../validators/'

const router = new Router()

router.put('/users/:id', Auth.update)

router.post('/guest/register', UserValidator.create(), Auth.verifyOtp, Auth.create)

router.post(
  '/internal/send-otp',
  Auth.sendOtp
)


export default router.routes()
