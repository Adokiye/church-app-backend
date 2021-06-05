import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

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
        amount: Joi.string().required()
      }
    })
}

export default MealValidator
