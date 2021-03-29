import { baseModel, modelUuid } from './index'

class FreeDelivery extends modelUuid(baseModel) {
  static tableName = 'free_deliveries'

  static hidden = [
    'user_id',
    
  ]
}

export default FreeDelivery
