import { baseModel, modelUuid } from './index'

class DeviceToken extends modelUuid(baseModel) {
  static tableName = 'device_tokens'
}

export default DeviceToken
