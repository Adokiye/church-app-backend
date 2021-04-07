import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const AppFeedbackValidator = {
  createAppFeedback: () =>
    validationMiddleware({
      body: {
        feedback: Joi.string().required(),
      }
    })
}

export default AppFeedbackValidator
