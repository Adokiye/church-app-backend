import { baseModel, modelUuid } from './index'

import { Model } from 'objection'
import Cokitchen from './cokitchen'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
  static hidden = [
    'cokitchen_id'
  ]

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: Cokitchen,
      join: {
        from: 'brands.cokitchen_id',
        to: 'cokitchen.id'
      }
    },

  
  }
}

export default Brand
