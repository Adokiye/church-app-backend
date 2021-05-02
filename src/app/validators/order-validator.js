import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let meal = Joi.object().keys({
  id: Joi.string().required(),
  quantity: Joi.number().greater(0).required(),
  order_note: Joi.string(),
  addons: Joi.array().items(
    Joi.object().keys({
      id: Joi.string().required(),
      quantity: Joi.number().greater(0).required()
    })
  )
})

let address = Joi.object()
  .keys({
    name: Joi.string().required(),
    building_number: Joi.string(),
    address_line: Joi.string().required()
  })
  .required()

const OrderValidator = {
  calculateOrder: () =>
    validationMiddleware({
      body: {
        meals: Joi.array().items(meal).required(),
        cokitchen_polygon_id: Joi.string().required(),
        address_details: address,
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
        address_details: address,

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
        order_details: Joi.object().keys({
          rider_note: Joi.string()
        })
      }
    })
}

export default OrderValidator
