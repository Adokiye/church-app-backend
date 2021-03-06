import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

let point = Joi.object().keys({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  })

const CokitchenValidator = {
  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string(),
        // cokitchen_id: Joi.string().required(),
      }
    }),
}

export default CokitchenValidator