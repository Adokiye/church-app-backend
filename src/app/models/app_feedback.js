import { baseModel, modelUuid } from './index'
import User from './user'

class AppFeedback extends modelUuid(baseModel) {
  static tableName = 'app_feedbacks'

  static hidden = ['user_id']

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'app_feedbacks.user_id',
        to: 'users.id'
      }
    }
  }
}

export default AppFeedback
