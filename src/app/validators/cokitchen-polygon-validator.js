import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let point = Joi.array().items(Joi.number()).min(2).max(2)

const CokitchenPolygonValidator = {
  create: () =>
    validationMiddleware({
      body: {
        polygon: Joi.array().items(point).required(),
        cokitchen_id: Joi.string().required(),
        name: Joi.string().required(),
        delivery_fee: Joi.string().required()
      }
    }),
  update: () =>
    validationMiddleware({
      body: {
        cokitchen_polygon_id: Joi.string().required(),
        polygon: Joi.array().items(point),
        name: Joi.string(),
        delivery_fee: Joi.string()
      }
    }),
  delete: () =>
    validationMiddleware({
      params: {
        id: Joi.string().required()
      }
    })
}

export default CokitchenPolygonValidator
