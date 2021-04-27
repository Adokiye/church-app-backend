import { baseModel, modelUuid } from './index'
import path from 'path'
import { Model } from 'objection'
import Cokitchen from './cokitchen'
import Meal from './meal'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
  static hidden = ['posist_data']

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
    },
    meal_categories: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, 'meal_category'),
      join: {
        from: 'brands.id',
        through: {
          from: 'meals.brand_id',
          to: 'meals.meal_category_id'
        },
        to: 'meal_categories.id'
      }
    }
  }
}

export default Brand
