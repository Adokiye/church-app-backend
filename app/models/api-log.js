import { baseModel, modelUuid } from './index'

class apiLog extends modelUuid(baseModel) {
  static tableName = 'api_logs'
}

export default apiLog
