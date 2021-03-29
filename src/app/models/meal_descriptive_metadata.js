import { baseModel, modelUuid } from './index'

class MealDescriptiveMetadata extends modelUuid(baseModel) {
  static tableName = 'meal_descriptive_metadatas'
}

export default MealDescriptiveMetadata
