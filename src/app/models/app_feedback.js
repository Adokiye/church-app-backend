import { baseModel, modelUuid } from './index'

class AppFeedback extends modelUuid(baseModel) {
  static tableName = 'app_feedbacks'
}

export default AppFeedback
