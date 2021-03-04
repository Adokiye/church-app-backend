import { baseModel, modelUuid } from './index'

class FreeDelivery extends modelUuid(baseModel) {
  static tableName = 'free_deliveries'
}

export default FreeDelivery
