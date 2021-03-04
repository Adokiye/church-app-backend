import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const UserValidator = {
  create: () =>
    validationMiddleware({
      body: {
            phone_number: Joi.string().min(11).max(11).required(),
      }
    }),
}

export default UserValidator
