import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import DealType from './dealType'

class Deal extends modelUuid(baseModel) {
  static tableName = 'deal_types'

  static relationMappings = {
    deal_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: DealType,
      join: {
        from: 'deals.deal_type_id',
        to: 'deal_types.id'
      }
    },
  }
}

export default Deal
