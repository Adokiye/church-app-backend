import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

class Otp extends modelUuid(baseModel) {
  static tableName = "otps";
}
export default Otp