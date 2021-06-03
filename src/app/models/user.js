import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'
import Role from './role'
import LogisticsCompany from './logistics_company'
import FreeDelivery from './free_delivery'
import UserSetting from './user_setting'
import DeviceToken from './device_token'
import UserSavedAddress from './user_saved_address'
import ReferralCode from './referral_code'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static hidden = [
    'password',
    'password_reset_token',
    'email_confirm_token',
  ]

  static relationMappings = {
    logistics_company: {
      relation: Model.BelongsToOneRelation,
      modelClass: LogisticsCompany,
      join: {
        from: 'users.logistics_company_id',
        to: 'logistics_companies.id'
      }
    },
    free_deliveries: {
      relation: Model.HasManyRelation,
      modelClass: FreeDelivery,
      join: {
        from: 'free_deliveries.user_id',
        to: 'users.id'
      }
    },
    device_tokens: {
      relation: Model.HasManyRelation,
      modelClass: DeviceToken,
      join: {
        from: 'device_tokens.user_id',
        to: 'users.id'
      }
    },
    user_saved_addresses: {
      relation: Model.HasManyRelation,
      modelClass: UserSavedAddress,
      join: {
        from: 'user_saved_addresses.user_id',
        to: 'users.id'
      }
    },
    referral_code: {
      relation: Model.HasOneRelation,
      modelClass: ReferralCode,
      join: {
        from: 'referral_codes.user_id',
        to: 'users.id'
      }
    }
  }
}
export default User