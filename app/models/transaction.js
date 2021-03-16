import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class Transaction extends modelUuid(baseModel) {
  static tableName = 'transactions'

  static hidden = [
    'user_id',
  ]

  static relationMappings = {
    user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'transactions.user_id',
          to: 'users.id'
        }
      },
  }
}

export default Transaction
