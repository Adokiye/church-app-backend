import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'
import User from './user'

class UserDeal extends modelUuid(baseModel) {
  static tableName = 'user_deals'

  static hidden = [
    'deal_id',
  ]

  static relationMappings = {
    deal: {
      relation: Model.BelongsToOneRelation,
      modelClass: Deal,
      join: {
        from: 'user_deals.deal_id',
        to: 'deals.id'
      }
    },
    user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_deals.user_id',
          to: 'users.id'
        }
      },
  }
}

export default UserDeal
