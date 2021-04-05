import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const FaqValidator = {
  createFaq: () =>
    validationMiddleware({
      body: {
        question: Joi.string().required(),
        answer: Joi.string().required()
      }
    }),
    updateFaqArrangment: () =>
    validationMiddleware({
      body: {
        faqs: Joi.array().required(),
      }
    }),
    delete: () =>
    validationMiddleware({
      body: {
        id: Joi.string().required()
      }
    })
}

export default FaqValidator
