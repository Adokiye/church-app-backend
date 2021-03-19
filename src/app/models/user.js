import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'
import Role from './role'
import LogisticsCompany from './logistics_company'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static hidden = [
    'password',
    'password_reset_token',
    'email_confirm_token',
    'role_id',
    'logistics_company_id'
  ]

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'users.role_id',
        to: 'roles.id'
      }
    },
    logistics_company: {
      relation: Model.BelongsToOneRelation,
      modelClass: LogisticsCompany,
      join: {
        from: 'users.logistics_company_id',
        to: 'logistics_companies.id'
      }
    }
  }
}
export default User
