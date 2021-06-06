import Router from 'koa-router'

import { Auth } from '../controllers/'

import UserValidator from '../validators/user-validator'

const router = new Router()

//authentication and user routes
router.put('/auth/user', UserValidator.update(), Auth.update)

router.get('/me', Auth.me)

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

router.post('/auth/login', UserValidator.login(), Auth.login)

export default router.routes()
