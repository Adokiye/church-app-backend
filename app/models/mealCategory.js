import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

class MealCategory extends modelUuid(baseModel) {
  static tableName = "meal_categories";
}
export default MealCategory