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
    updateFaq: () =>
    validationMiddleware({
      body: {
        faq_id: Joi.string().required(),
      }
    }),
  updateFaqArrangment: () =>
    validationMiddleware({
      body: {
        faq_arrangement: Joi.array()
          .items(
            Joi.object().keys({
              question: Joi.string().required(),
              answer: Joi.string().required(),
              id: Joi.string().required()
            })
          )
          .required()
      }
    }),
  deleteFaq: () =>
    validationMiddleware({
      params: {
        id: Joi.string().required()
      }
    })
}

export default FaqValidator
