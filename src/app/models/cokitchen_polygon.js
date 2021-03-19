import { baseModel, modelUuid } from './index'

import { Model } from 'objection'

import Cokitchen from './cokitchen'

class CokitchenPolygon extends modelUuid(baseModel) {
  static tableName = 'cokitchen_polygons'
  static hidden = ['cokitchen_id']

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: Cokitchen,
      join: {
        from: 'cokitchen_polygons.cokitchen_id',
        to: 'cokitchen.id'
      }
    }
  }
}

export default CokitchenPolygon
