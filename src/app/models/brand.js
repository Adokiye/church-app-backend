import { baseModel, modelUuid } from './index'

import { Model } from 'objection'
import Cokitchen from './cokitchen'
import Meal from './meal'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
  static hidden = ['cokitchen_id']

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: Cokitchen,
      join: {
        from: 'brands.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    meal: {
      relation: Model.HasManyRelation,
      modelClass: Cokitchen,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id'
      }
    }
  }
}

export default Brand
