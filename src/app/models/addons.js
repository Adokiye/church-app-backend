import { baseModel, modelUuid } from './index'
import Meal from './meal'
import { Model } from 'objection'

class Addon extends modelUuid(baseModel) {
  static tableName = 'addons'

  static relationMappings = {
    meal_data: {
      relation: Model.HasOneRelation,
      modelClass: Meal,
      join: {
        from: 'addons.meal_addon_id',
        to: 'meals.id'
      }
    }
  }
}

export default Addon
