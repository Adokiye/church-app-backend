import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import OrderType from './order_type'
import UserCard from './user_card'
import CalculatedOrder from './calculated_order'

class Order extends modelUuid(baseModel) {
  static tableName = 'orders'

  static hidden = ['order_type_id', 'user_card_id', 'calculated_order_id']

  static relationMappings = {
    order_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderType,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id'
      }
    },
    user_card: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserCard,
      join: {
        from: 'orders.user_card_id',
        to: 'user_cards.id'
      }
    },
    calculated_order: {
      relation: Model.BelongsToOneRelation,
      modelClass: CalculatedOrder,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_orders.id'
      }
    }
  }
}

export default Order
