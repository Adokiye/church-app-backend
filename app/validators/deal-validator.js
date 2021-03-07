import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'


let image = Joi.string()


const DealsValidator = {
  createDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string().required(),
        brands: Joi.array().items(Joi.string()),
        name: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().items(image).required(),
        rate:Joi.number().required()
      }
    }),
    updateDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string(),
        brands: Joi.array().items(Joi.string()),
        name: Joi.string(),
        description: Joi.string(),
        images: Joi.array().items(image),
        rate:Joi.number()
      }
    }),
}

export default DealsValidator
