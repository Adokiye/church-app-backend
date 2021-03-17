import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class UserCard extends modelUuid(baseModel) {
  static tableName = 'user_cards'

  static hidden = [
    'user_id',
  ]

  static relationMappings = {
    user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_cards.user_id',
          to: 'users.id'
        }
      },
  }
}

export default UserCard
