import { Model } from 'objection'

import SuperMealCategory from './superMealCategory'

import { baseModel, modelUuid, modelUnique } from './index'

class MealCategory extends modelUuid(baseModel) {
  static tableName = "meal_categories";

  static relationMappings = {
    super_meal_category: {
      relation: Model.BelongsToOneRelation,
      modelClass: SuperMealCategory,
      join: {
        from: 'meal_categories.super_meal_category_id',
        to: 'super_meal_category.id'
      }
    },
  }

}
export default MealCategory