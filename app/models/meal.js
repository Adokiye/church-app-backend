import { Model } from 'objection'

import MealCategory from './meal_category'
import Addons from './addons'

import { baseModel, modelUuid, modelUnique } from './index'

class Meal extends modelUuid(baseModel) {
  static tableName = "meals";

  static relationMappings = {
    meal_category: {
      relation: Model.BelongsToOneRelation,
      modelClass: MealCategory,
      join: {
        from: 'meals.meal_category_id',
        to: 'meal_categories.id'
      }
    },
    addons: {
        relation: Model.HasManyRelation,
        modelClass: Addons,
        join: {
          from: 'addons.meal_id',
          to: 'meals.id'
        }
      },
  }

}
export default Meal