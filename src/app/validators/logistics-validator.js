import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const LogisticsValidator = {
  createLogisticsCompany: () =>
    validationMiddleware({
      body: {
        contact_phone_number: Joi.string().min(11).max(11).required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        contact_email: Joi.string().email()
      }
    }),
  createLogisticsStaff: () =>
    validationMiddleware({
      body: {
        username: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        other_name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
          .message(
            'Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'
          ),
        logistics_company_id: Joi.string().required()
      }
    }),
    createLogisticsSuperAdmin: () =>
    validationMiddleware({
      body: {
        username: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        other_name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'))
          .message(
            'Password must contain minimun 8 characters, at least 1 UPPERCASE letter, at least 1 lowercase letter and at least 1 digit'
          ),

      }
    })
}

export default LogisticsValidator
