import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const UserValidator = {
  create: () =>
    validationMiddleware({
      body: {
        phone_number: Joi.string().min(11).max(11).required(),
        otp: Joi.string().required(),
      }
    }),
  update: () =>
    validationMiddleware({
      body: {
        first_name: Joi.string(),
        last_name: Joi.string(),
        other_name: Joi.string(),
        dob: Joi.string(),
        gender: Joi.string().valid('male', 'female'),
        email: Joi.string().email(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
          .message(
            'Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'
          )
      }
    })
}

export default UserValidator