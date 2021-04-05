import Joi from '@hapi/joi'

import { validationMiddleware } from '../middlewares'

const UserSettingsValidator = {
  updateUserSettings: () =>
    validationMiddleware({
      body: {
        user_settings_id: Joi.string().required(),
        email_notification: Joi.bool().required(),
        // sms_notification: Joi.bool().required(),
        device_notification: Joi.bool().required(),
        device_notification_all_deals_and_promotions: Joi.bool().required(),
        device_notification_special_offers_and_announcements: Joi.bool().required(),
        device_notification_when_order_is_on_the_way: Joi.bool().required(),
        device_notification_when_order_is_arriving: Joi.bool().required(),
        device_notification_when_order_is_being_prepared: Joi.bool().required()
      }
    })
}

export default UserSettingsValidator
