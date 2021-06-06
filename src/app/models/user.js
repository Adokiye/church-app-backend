import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'
import Role from './role'

class User extends modelUuid(baseModel) {
  static tableName = 'users'

  static hidden = ['password', 'password_reset_token', 'email_confirm_token']

  static relationMappings = {}
}
export default User
