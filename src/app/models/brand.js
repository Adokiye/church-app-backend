import { baseModel, modelUuid } from './index'
import path from 'path'
import { Model } from 'objection'
import Cokitchen from './cokitchen'
import Meal from './meal'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
  //static hidden = ['cokitchen_id']

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'cokitchen'),
      join: {
        from: 'brands.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    meals: {
      relation: Model.HasManyRelation,
      modelClass: Meal,
      join: {
        from: 'meals.brand_id',
        to: 'brands.id'
      }
    }
  }
}

export default Brand
