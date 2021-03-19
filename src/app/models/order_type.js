import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

class OrderType extends modelUuid(baseModel) {
  static tableName = 'order_types'

  static relationMappings = {}
}

export default OrderType
