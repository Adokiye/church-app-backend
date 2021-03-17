import { baseModel, modelUuid } from './index'

import { Model } from 'objection'

import CokitchenPolygon from './cokitchen_polygon'


class LogisticsCompanyCokitchenPolygon extends modelUuid(baseModel) {
  static tableName = 'logistics_company_cokitchen_polygons'
  static hidden = [
    'cokitchen_polygon_id'
  ]

  static relationMappings = {
    cokitchen_polygon: {
      relation: Model.BelongsToOneRelation,
      modelClass: CokitchenPolygon,
      join: {
        from: 'logistics_company_cokitchen_polygons.cokitchen_polygon_id',
        to: 'cokitchen_polygon.id'
      }
    },
  }
}

export default LogisticsCompanyCokitchenPolygon
