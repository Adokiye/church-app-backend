import { baseModel, modelUuid } from './index'

class MealBusinessMetadata extends modelUuid(baseModel) {
  static tableName = 'meal_business_metadatas'
}

export default MealBusinessMetadata
