import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let point = Joi.array().items(Joi.number()).min(2).max(2)

const CokitchenPolygonValidator = {
  create: () =>
    validationMiddleware({
      body: {
        polygon: Joi.array().items(point).required(),
        cokitchen_id: Joi.string().required(),
      }
    }),
   update: () =>
    validationMiddleware({
      body: {
        polygon: Joi.array().items(point).required(),
      }
    }),
}

export default CokitchenPolygonValidator