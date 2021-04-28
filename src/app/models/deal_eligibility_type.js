import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'

class DealEligibilityType extends modelUuid(baseModel) {
  static tableName = 'deal_eligibility_types'

  static relationMappings = {}
}

export default DealEligibilityType
