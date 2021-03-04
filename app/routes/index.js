import Router from 'koa-router'

import global_router from './api'

const router = new Router()
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
