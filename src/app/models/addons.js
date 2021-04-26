import { baseModel, modelUuid } from './index'
import Meal from './meal'
import { Model } from 'objection'

class Addon extends modelUuid(baseModel) {
  static tableName = 'addons'
  static hidden = ['meal_id']

  static relationMappings = {
    meal: {
      relation: Model.HasOneRelation,
      modelClass: Meal,
      join: {
        from: 'meals.id',
        to: 'addons.meal_addon_id'
      }
    }
  }
}

export default Addon
