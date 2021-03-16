import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import DealType from './deal_type'
import Brand from './brand'

class Deal extends modelUuid(baseModel) {
  static tableName = 'deals'

  static hidden = [
    'deal_type_id',
    'brand_id',
  ]

  static relationMappings = {
    deal_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: DealType,
      join: {
        from: 'deals.deal_type_id',
        to: 'deal_types.id'
      }
    },
    brand: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'deals.brand_id',
          to: 'brands.id'
        }
      },
  }
}

export default Deal
