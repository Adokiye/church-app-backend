import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

class CalculatedOrder extends modelUuid(baseModel) {
  static tableName = 'calculated_orders'

  static relationMappings = {}
}

export default CalculatedOrder
