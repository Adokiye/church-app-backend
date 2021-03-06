import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const BrandValidator = {
  getUserBrands: () =>
    validationMiddleware({
      body: {
        lat: Joi.number().required(),
        lng: Joi.number().required()
      }
    }),
}

export default BrandValidator