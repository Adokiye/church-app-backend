import { Unauthorized } from '../helpers'
import ApiKey from '../models/api_key'

const internalRoutes = [{ url: '/v1/internal', method: 'GET' }]

const isAnInternalRouteToCheck = request => {
  return internalRoutes.find(
    item => request.url.includes(item.url)
    // && item.method === request.method
  )
}

export const internalAuthentication = async ({ request }, next) => {
  const requestKeyValue = request.headers['x-api-key']

  if (requestKeyValue || isAnInternalRouteToCheck(request)) {
    await ApiKey.query()
      .findOne({
        key: 'APP_KEY',
        value: requestKeyValue,
        active: true
      })
      .catch(() => {
        throw Unauthorized('Please provide a valid app key')
      })
  }

  return next()
}
