import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const AuthValidator = {
  login: () =>
    validationMiddleware({
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).required()
      }
    }),

  register: () =>
    validationMiddleware({
      body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        other_name: Joi.string().required(),
        title: Joi.string().required(),
        home_address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        phone_number: Joi.string().min(11).max(11).required(),
        email: Joi.string().email().required()
      }
    }),

  verify: () =>
    validationMiddleware({
      body: {
        type: Joi.string().valid('email', 'otp').required(),
        token: Joi.string(),
        otp: Joi.string(),
        phone_number: Joi.string()
      }
    }),

  resend: () =>
    validationMiddleware({
      body: {
        type: Joi.string().valid('email', 'otp').required(),
        email: Joi.string().email(),
        phone_number: Joi.string()
      }
    }),

  reset: () =>
    validationMiddleware({
      body: {
        token: Joi.string().required(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
          .message(
            'Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'
          )
          .required()
      }
    }),

  forget: () =>
    validationMiddleware({
      body: {
        email: Joi.string().email().required()
      }
    })
}

export default AuthValidator
