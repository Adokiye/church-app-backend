import { baseModel, modelUuid } from './index'

class MealTag extends modelUuid(baseModel) {
  static tableName = 'meal_tags'
}

export default MealTag
