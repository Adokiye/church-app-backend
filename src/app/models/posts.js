import { Model } from 'objection'

import Deal from './deal'

import { baseModel, modelUuid, modelUnique } from './index'

class Post extends modelUuid(baseModel) {
  static tableName = 'posts'

  static hidden = ['deal_id']


  static relationMappings = {
    deal: {
      relation: Model.HasOneRelation,
      modelClass: Deal,
      join: {
        from: 'posts.deal_id',
        to: 'deals.id'
      }
    }
  }
}
export default Post
