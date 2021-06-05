import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const MealValidator = {
  chargeCardOrder: () =>
    validationMiddleware({
      body: {
        card_id: Joi.string().required(),
        amount: Joi.string().required()
      }
    }),
  chargeCardWallet: () =>
    validationMiddleware({
      body: {
        card_id: Joi.string().required(),
        amount: Joi.string().required(),
        calculated_order_id: Joi.string().required(),
        order_type_id: Joi.string().required(),
        use_wallet: Joi.bool(),
        order_details: Joi.object().keys({
          rider_note: Joi.string(),
          cutlery: Joi.bool().required()
        })
      }
    })
}

export default MealValidator
