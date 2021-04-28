import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'

class DealValueType extends modelUuid(baseModel) {
  static tableName = 'deal_value_types'

  static relationMappings = {}
}

export default DealValueType
