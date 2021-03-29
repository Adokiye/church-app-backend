import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class ReferralCode extends modelUuid(baseModel) {
  static tableName = 'referral_codes'

  static hidden = ['user_id']

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'referral_codes.user_id',
        to: 'users.id'
      }
    }
  }
}

export default ReferralCode
