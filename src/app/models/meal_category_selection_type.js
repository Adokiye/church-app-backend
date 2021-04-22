import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'
import MealCategory from './meal_category'

class MealCategorySelectionType extends modelUuid(baseModel) {
  static tableName = 'meal_category_selection_types'

  static relationMappings = {
    meal_categories: {
      relation: Model.HasManyRelation,
      modelClass: MealCategory,
      join: {
        from: 'meal_categories.meal_category_selection_type_id',
        to: 'meal_category_selection_type.id'
      }
    }
  }
}
export default MealCategorySelectionType
