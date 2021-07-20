import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'
import Role from './role'
import path from 'path'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static hidden = ['password', 'password_reset_token', 'email_confirm_token']

  static relationMappings = {
    user_validated_histories: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'user_validated_history'),
      join: {
        from: 'user_validated_histories.user_id',
        to: 'users.id'
      }
    }
  }
}
export default User
