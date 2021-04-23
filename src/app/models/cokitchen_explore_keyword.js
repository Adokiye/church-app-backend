import { baseModel, modelUuid } from './index'

import { Model } from 'objection'

import Cokitchen from './cokitchen'
import MealKeywords from './meal_keyword'

class CokitchenExploreKeyword extends modelUuid(baseModel) {
  static tableName = 'cokitchen_home_page_posts'
  static hidden = ['cokitchen_id', 'meal_keyword_id']

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: Cokitchen,
      join: {
        from: 'cokitchen_explore_keywords.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    meal_keyword: {
      relation: Model.BelongsToOneRelation,
      modelClass: MealKeywords,
      join: {
        from: 'cokitchen_explore_keywords.meal_keyword_id',
        to: 'meal_keywords.id'
      }
    }
  }
}

export default CokitchenExploreKeyword
