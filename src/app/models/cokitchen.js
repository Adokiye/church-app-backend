import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Brand from './brand'
import CokitchenPolygon from './cokitchen_polygon'
import Meal from './meal'

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
        from: 'coitchens.id',
        through: {
          from: 'brands.cokitchen_id',
          to: 'brands.id'
        },
        to: 'meals.brand_id'
      }
    }
  }
}

export default Cokitchen
