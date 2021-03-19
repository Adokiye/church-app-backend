import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'

class DealType extends modelUuid(baseModel) {
  static tableName = 'deal_types'

  static relationMappings = {}
}

export default DealType
