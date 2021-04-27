import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

class SuperMealCategory extends modelUuid(baseModel) {
  static tableName = 'super_meal_categories'
  static hidden = ['posist_data']

}
export default SuperMealCategory
