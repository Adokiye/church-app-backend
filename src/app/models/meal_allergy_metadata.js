import { baseModel, modelUuid } from './index'

class MealAllergyMetadata extends modelUuid(baseModel) {
  static tableName = 'meal_allergy_metadatas'
}

export default MealAllergyMetadata
