import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'
import path from 'path'

class UserValidatedHistory extends modelUuid(baseModel) {
  static tableName = 'user_validated_histories'

  static hidden = ['user_id']

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: path.join(__dirname, 'user'),
      join: {
        from: 'user_validated_histories.user_id',
        to: 'users.id'
      }
    },
    admin: {
      relation: Model.HasOneRelation,
      modelClass: path.join(__dirname, 'user'),
      join: {
        from: 'user_validated_histories.admin_id',
        to: 'users.id'
      }
    }
  }
}

export default UserValidatedHistory
