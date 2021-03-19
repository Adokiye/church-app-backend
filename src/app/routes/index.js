import Router from 'koa-router'

import global_router from './api.js'

import { SwaggerRouter } from 'koa-swagger-decorator'

//const router = new Router()

const router = new SwaggerRouter()

const api = new Router()

api.use(global_router)

/**
 * Root api endpoint
 * @returns health condition and service name
 */
router.get('/', () => {
  return {
    status: true,
    health: 'ok',
    message: 'Food Court App'
  }
})

router.use('/v1', api.routes())

export default router
