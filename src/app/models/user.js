import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'
import Role from './role'
import LogisticsCompany from './logistics_company'
import FreeDelivery from './free_delivery'
import UserSetting from './user_setting'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static hidden = [
    'password',
    'password_reset_token',
    'email_confirm_token',
    'logistics_company_id',
    
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
  }
}
export default User
