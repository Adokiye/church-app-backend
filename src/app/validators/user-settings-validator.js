import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const UserSettingsValidator = {
  updateUserSettings: () =>
    validationMiddleware({
      body: {
        user_settings_id: Joi.string().required()
      }
    }),
  createUserAddress: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        address: Joi.string().required(),
        lat: Joi.string().required(),
        lng: Joi.string().required()
      }
    }),
  updateUserAddress: () =>
    validationMiddleware({
      body: {
        user_saved_address_id: Joi.string().required()
      }
    }),
  deleteUserAddress: () =>
    validationMiddleware({
      body: {
        id: Joi.string().required()
      }
    })
}

export default UserSettingsValidator
