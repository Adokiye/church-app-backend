import { baseModel, modelUuid } from './index'

class MealKeywords extends modelUuid(baseModel) {
  static tableName = 'meal_keywords'
}

export default MealKeywords
