import { baseModel, modelUuid } from './index'
import { Model } from 'objection'
import path from 'path'
import Brand from './brand'
import CokitchenPolygon from './cokitchen_polygon'
import Meal from './meal'
import CokitchenExploreKeyword from './cokitchen_explore_keyword'

class Cokitchen extends modelUuid(baseModel) {
  static tableName = 'cokitchens'

  static relationMappings = {
    brands: {
      relation: Model.HasManyRelation,
      modelClass: Brand,
      join: {
        from: 'brands.cokitchen_id',
        to: 'cokitchens.id'
      }
    },

    cokitchen_polygons: {
      relation: Model.HasManyRelation,
      modelClass: CokitchenPolygon,
      join: {
        from: 'cokitchen_polygons.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    meals: {
      relation: Model.ManyToManyRelation,
      modelClass: Meal,
      join: {
        from: 'cokitchens.id',
        through: {
          from: 'brands.cokitchen_id',
          to: 'brands.id'
        },
        to: 'meals.brand_id'
      }
    },
    deals: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'deal'),
      join: {
        from: 'deals.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    cokitchen_home_page_posts: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, 'cokitchen_home_page_post'),
      join: {
        from: 'cokitchen_home_page_posts.cokitchen_id',
        to: 'cokitchens.id'
      }
    },
    cokitchen_explore_keywords: {
      relation: Model.HasManyRelation,
      modelClass: CokitchenExploreKeyword,
      join: {
        from: 'cokitchen_explore_keywords.cokitchen_id',
        to: 'cokitchens.id'
      }
    }
  }
}

export default Cokitchen