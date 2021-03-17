import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class UserSetting extends modelUuid(baseModel) {
  static tableName = 'user_settings'

  static hidden = [
    'user_id',
  ]

  static relationMappings = {
    user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_settings.user_id',
          to: 'users.id'
        }
      },
  }
}

export default UserSetting
