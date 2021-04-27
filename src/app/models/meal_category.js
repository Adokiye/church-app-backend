import { Model } from 'objection'

import SuperMealCategory from './supermeal_category'
import MealCategorySelectionType from './meal_category_selection_type'
import path from 'path'

import { baseModel, modelUuid, modelUnique } from './index'

class MealCategory extends modelUuid(baseModel) {
  static tableName = 'meal_categories'
  static hidden = ['meal_category_selection_type_id']
  static relationMappings = {
    super_meal_category: {
      relation: Model.BelongsToOneRelation,
      modelClass: SuperMealCategory,
      join: {
        from: 'meal_categories.super_meal_category_id',
        to: 'super_meal_categories.id'
      }
    },
    meal_category_selection_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: MealCategorySelectionType,
      join: {
        from: 'meal_categories.meal_category_selection_type_id',
        to: 'meal_category_selection_types.id'
      }
    },
    addons: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, 'addons'),
      join: {
        from: 'meal_categories.id',
        through: {
          from: 'meals.meal_category_id',
          to: 'meals.id'
        },
        to: 'addons.meal_addon_id'
      }
    }
  }
}
export default MealCategory
