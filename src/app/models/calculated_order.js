import { baseModel, modelUuid } from './index'
import { Model } from 'objection'
import path from 'path'

class CalculatedOrder extends modelUuid(baseModel) {
  static tableName = 'calculated_orders'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'user'),
      join: {
        from: 'calculated_orders.user_id',
        to: 'users.id'
      }
    },
    cokitchen_polygon: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'cokitchen_polygon'),
      join: {
        from: 'calculated_orders.cokitchen_polygon_id',
        to: 'cokitchen_polygons.id'
      }
    },
  }
}

export default CalculatedOrder
