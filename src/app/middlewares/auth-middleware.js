import jwt from 'koa-jwt'

import { JWT_SECRET } from '../config'
import { Unauthorized } from '../helpers'

export const getToken = ({ headers }) => {
  if (!headers.authorization) {
    throw Unauthorized('You need to submit a token')
  }

  const [bearer, token] = headers.authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw Unauthorized('Invalid token')
  }

  return token
}

export const authMiddleware = jwt({
  secret: JWT_SECRET,
  getToken
}).unless({
  path: [
    '/v1/auth/login',
    'v1/auth/login-marketing',
    'v1/auth/login-logistics-admin',
    '/v1/auth/forget',
    '/v1/auth/reset',
    '/v1/auth/guest/authenticate',
    '/v1/auth/verify',
    '/v1/auth/resend',
    '/public',
    '/',
    '/v1/banks',
    '/v1/api/swagger-html',
    /^\/v1\/internal\/.*/
  ]
})
