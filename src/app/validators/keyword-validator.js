import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const KeywordValidator = {
  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required()
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
