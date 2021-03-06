import { baseModel, modelUuid } from './index'

import { Model } from 'objection'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
  static hidden = [
    'cokitchen_id'
  ]

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
  }
}

export default Brand
