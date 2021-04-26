import { baseModel, modelUuid } from './index'
import Meal from './meal'
import path from 'path'
import { Model } from 'objection'

class Addon extends modelUuid(baseModel) {
  static tableName = 'addons'

  static relationMappings = {
    meal_data: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'meal'),
      
      join: {
        from: 'addons.meal_addon_id',
        to: 'meals.id'
      }
    }
  }
}

export default Addon