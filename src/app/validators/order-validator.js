import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let meal = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string().required(),
  quantity: Joi.number().required(),
  addons: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      id: Joi.string().required(),
      quantity: Joi.number().required()
    })
  )
})

const OrderValidator = {
  calculateOrder: () =>
    validationMiddleware({
      body: {
        meals: Joi.array().items(meal).required(),
        cokitchen_polygon_id: Joi.string().required(),
        address: Joi.string().required(),
        discount_code: Joi.string(),
        lat: Joi.string().required(),
        lng: Joi.string().required()
      }
    }),
  updateCalculatedOrder: () =>
    validationMiddleware({
      body: {
        meals: Joi.array().items(meal),
        cokitchen_polygon_id: Joi.string(),
        address: Joi.string(),
        discount_code: Joi.string(),
        lat: Joi.string(),
        lng: Joi.string()
      }
    }),
    createOrder: () =>
    validationMiddleware({
      body: {
        calculated_order_id: Joi.string().required(),
        order_type_id: Joi.string().required(),
        use_wallet: Joi.bool(),
        order_details:   Joi.object().keys({
          rider_note: Joi.string().required(),
          order_note: Joi.string().required(),
        })
      }
    })
}

export default OrderValidator
