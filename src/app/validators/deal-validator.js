import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

let image = Joi.string()

let brand = Joi.object().keys()

const DealsValidator = {
  createDeal: () =>
    validationMiddleware({
      body: {
        deal_type_id: Joi.string().required(),
        deal_value_type_id: Joi.string().required(),
        deal_requirement_type_id: Joi.string().required(),
        deal_eligibility_type_id: Joi.string().required(),

        brands: Joi.array().items(
          Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
          })
        ),
        title: Joi.string().required(),
        heading: Joi.string().required(),
        body: Joi.string().required(),
        images: Joi.array().items(image).required(),
        rate: Joi.number().required(),
        min_amount: Joi.string(),
        max_amount: Joi.string(),

        min_items: Joi.string(),
        max_items: Joi.string(),

        to_expire_date: Joi.date().required(),
        to_expire_time: Joi.string().required(),
        to_start_date: Joi.date().required(),
        to_start_time: Joi.string().required(),
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
