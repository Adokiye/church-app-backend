import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const KeywordValidator = {
  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required()
      }
    }),
  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string(),
        icon: Joi.string(),
        keyword_id: Joi.string().required(),
        keyword_type: Joi.string().required().valid('meal_allergy_metadata'),
        images: Joi.array().items(Joi.string().required())
      }
    }),
  delete: () =>
    validationMiddleware({
      body: {
        id: Joi.string().required()
      }
    })
}

export default KeywordValidator
