import { baseModel, modelUuid } from './index'

class apiKeys extends modelUuid(baseModel) {
  static tableName = 'api_keys'
}

export default apiKeys
