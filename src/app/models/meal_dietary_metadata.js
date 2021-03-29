import { baseModel, modelUuid } from './index'

class MealDietaryMetadata extends modelUuid(baseModel) {
  static tableName = 'meal_dietary_metadatas'
}

export default MealDietaryMetadata
