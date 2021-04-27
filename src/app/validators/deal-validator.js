import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

let brand = Joi.object().keys()

const DealsValidator = {
  createDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string().required(),
        brands: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        name: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().items(image).required(),
        rate: Joi.number().required(),
        min: Joi.string(),
        to_expire: Joi.date()
      }
    }),
  updateDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string(),
        brands: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        name: Joi.string(),
        description: Joi.string(),
        images: Joi.array().items(image),
        rate: Joi.number().required(),
        min: Joi.string(),
        to_expire: Joi.date()
      }
    })
}

export default DealsValidator
