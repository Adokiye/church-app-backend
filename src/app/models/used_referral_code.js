import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'
import ReferralCode from './referral_code'

class UsedReferralCode extends modelUuid(baseModel) {
  static tableName = 'used_referral_codes'

  static hidden = ['user_id', 'referral_code_id']

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'referral_codes.user_id',
        to: 'users.id'
      }
    },
    referral_code: {
      relation: Model.BelongsToOneRelation,
      modelClass: ReferralCode,
      join: {
        from: 'used_referral_codes.referral_code_id',
        to: 'referral_codes.id'
      }
    }
  }
}

export default UsedReferralCode
