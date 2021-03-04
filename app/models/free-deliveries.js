import { baseModel, modelUuid } from './index'

class freeDelivery extends modelUuid(baseModel) {
  static tableName = 'free_deliveries'
}

export default freeDelivery
