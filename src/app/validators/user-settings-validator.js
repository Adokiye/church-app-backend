import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const UserSettingsValidator = {
  updateUserSettings: () =>
    validationMiddleware({
      body: {
        user_settings_id: Joi.string().required(),
        email_notification: Joi.bool(),
        sms_notification: Joi.bool(),
        device_notification: Joi.bool(),
        device_notification_all_deals_and_promotions: Joi.bool(),
        device_notification_special_offers_and_announcements: Joi.bool(),
        device_notification_when_order_is_on_the_way: Joi.bool(),
        device_notification_when_order_is_arriving: Joi.bool(),
        device_notification_when_order_is_being_prepared: Joi.bool()
      }
    }),
  createUserAddress: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        address: Joi.string().required(),
        lat: Joi.string().required(),
        lng: Joi.string().required(),
        phone_number: Joi.string().min(11).max(11)
      }
    }),
  updateUserAddress: () =>
    validationMiddleware({
      body: {
        user_saved_address_id: Joi.string().required(),
        address: Joi.string(),
        lat: Joi.string(),
        lng: Joi.string(),
        phone_number: Joi.string().min(11).max(11)
      }
    }),
  deleteUserAddress: () =>
    validationMiddleware({
      params: {
        id: Joi.string().required()
      }
    })
}

export default UserSettingsValidator
