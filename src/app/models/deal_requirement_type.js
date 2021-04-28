import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'

class DealRequirementType extends modelUuid(baseModel) {
  static tableName = 'deal_requirement_types'

  static relationMappings = {}
}

export default DealRequirementType
