import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class ReferralCode extends modelUuid(baseModel) {
  static tableName = 'referral_codes'

  static hidden = ['user_id']

}

export default ReferralCode
