import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const UserValidator = {
  send_otp: () =>
    validationMiddleware({
      body: {
        phone_number: Joi.string().min(11).max(11).required(),
        action: Joi.string().required()
      }
    }),
  verify_member_code: () =>
    validationMiddleware({
      body: {
        member_code: Joi.string().required()
      }
    }),
  create: () =>
    validationMiddleware({
      body: {
        phone_number: Joi.string().min(11).max(11).required(),
        // otp: Joi.string().required(),
        // action: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        other_name: Joi.string(),
        dob: Joi.date(),
        user_gender: Joi.string().valid('male', 'female'),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        profile_url: Joi.string(),
        marital_status: Joi.string().valid('single', 'married').required(),

        employment_status: Joi.string().required(),
        educational_background: Joi.string().required(),
        baptismal_status: Joi.string().required(),
        role: Joi.string().valid('USER', 'ADMIN', 'SUPER_ADMIN').required()
      }
    }),
  login: () =>
    validationMiddleware({
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(1).required()
      }
    }),
  update: () =>
    validationMiddleware({
      body: {
        first_name: Joi.string(),
        last_name: Joi.string(),
        other_name: Joi.string(),
        dob: Joi.date(),
        user_gender: Joi.string().valid('male', 'female'),
        email: Joi.string().email(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
          .message(
            'Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'
          ),
        address: Joi.string(),
        profile_url: Joi.string(),
        marital_status: Joi.string().valid('single', 'married'),
        employment_status: Joi.string(),
        educational_background: Joi.string(),
        baptismal_status: Joi.string(),
        role: Joi.string().valid('USER', 'ADMIN', 'SUPER_ADMIN')
      }
    }),
  updateDeviceToken: () =>
    validationMiddleware({
      body: {
        device_token: Joi.string().required(),
        device_name: Joi.string().required(),
        device_type: Joi.string().required()
      }
    }),
  checkForUsername: () =>
    validationMiddleware({
      body: {
        username: Joi.string().required()
      }
    })
}

export default UserValidator
