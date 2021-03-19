import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import Brand from './brand'
import CokitchenPolygon from './cokitchen_polygon'

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
    }
  }
}

export default Cokitchen
