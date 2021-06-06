import Router from 'koa-router'

import { Auth } from '../controllers/'

import UserValidator from '../validators/user-validator'

const router = new Router()

//authentication and user routes

//send otp
router.post('/internal/send-otp', UserValidator.send_otp(), Auth.sendOtp)

router.put('/auth/user', UserValidator.update(), Auth.update)

router.get('/me', Auth.me)

router.post(
  '/auth/update-device-token',
  UserValidator.updateDeviceToken(),
  Auth.updateDeviceToken
)

router.post(
  '/internal/register',
  UserValidator.create(),
  Auth.verifyOtp,
  Auth.create
)

router.post('/internal/login', UserValidator.login(), Auth.login)

export default router.routes()
