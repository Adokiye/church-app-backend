import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const CokitchenExploreKeywordValidator = {
  create: () =>
    validationMiddleware({
      body: {
        meal_keyword_id: Joi.string().required(),
        cokitchen_id: Joi.string().required()
      }
    }),
    delete: () =>
    validationMiddleware({
      params: {
        id: Joi.string().required()
      }
    })
}

export default CokitchenExploreKeywordValidator
