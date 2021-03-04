import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

import bcrypt from 'bcrypt'

class User extends modelUuid(baseModel) {
  static tableName = "users";

  static hidden = [
    'password',
    'password_reset_token',
    'email_confirm_token'
  ]

  // Encrypt the password before it is stored in the database
  async $beforeInsert() {
    await bcrypt.hash(this.password, 10, (err, hash) => {
      this.password = hash;
    });
  }

  //link user to auth token,
  static relationMappings = {
}
}
export default User
