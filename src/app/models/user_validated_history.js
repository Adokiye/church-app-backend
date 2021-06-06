import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class UserValidatedHistory extends modelUuid(baseModel) {
  static tableName = 'user_validated_histories'

  static hidden = ['user_id']

  static relationMappings = {}
}

export default UserValidatedHistory
