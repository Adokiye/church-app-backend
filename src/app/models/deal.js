import { baseModel, modelUuid } from './index'
import { Model } from 'objection'
import path from 'path'
import Brand from './brand'

class Deal extends modelUuid(baseModel) {
  static tableName = 'deals'

  static hidden = ['deal_type_id', 'brand_id','deal_value_type_id','deal_requirement_type_id','deal_eligibility_type_id']

  static relationMappings = {
    deal_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'deal_type'),

      join: {
        from: 'deals.deal_type_id',
        to: 'deal_types.id'
      }
    },
    deal_value_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'deal_value_type'),
      join: {
        from: 'deals.deal_value_type_id',
        to: 'deal_value_types.id'
      }
    },
    deal_eligibility_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'deal_eligibility_type'),
      join: {
        from: 'deals.deal_eligibility_type_id',
        to: 'deal_eligibility_types.id'
      }
    },
    deal_requirement_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'deal_requirement_type'),
      join: {
        from: 'deals.deal_requirement_type_id',
        to: 'deal_requirement_types.id'
      }
    },
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: 'deals.brand_id',
        to: 'brands.id'
      }
    }
  }
}

export default Deal
