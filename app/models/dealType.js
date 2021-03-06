import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Deal from './deal'

class DealType extends modelUuid(baseModel) {
  static tableName = 'deal_types'

  static relationMappings = {
    deals: {
      relation: Model.HasManyRelation,
      modelClass: Deal,
      join: {
        from: 'deals.deal_type_id',
        to: 'deal_types.id'
      }
    },
  }
}

export default DealType
