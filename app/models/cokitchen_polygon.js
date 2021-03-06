import { baseModel, modelUuid } from './index'

class CokitchenPolygon extends modelUuid(baseModel) {
  static tableName = 'cokitchen_polygons'
  static hidden = [
    'cokitchen_id'
  ]
}

export default CokitchenPolygon
