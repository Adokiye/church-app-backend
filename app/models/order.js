import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import OrderType from './order_type'
import UserCard from './user_card'

class Order extends modelUuid(baseModel) {
  static tableName = 'orders'

  static hidden = [
    'order_type_id',
    'card_id'
  ]

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
  }
}

export default Order
