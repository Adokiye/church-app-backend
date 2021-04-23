import { baseModel, modelUuid } from './index'

import { Model } from 'objection'

import Cokitchen from './cokitchen'

class CokithenHomePagePost extends modelUuid(baseModel) {
  static tableName = 'cokitchen_home_page_posts'
  static hidden = ['cokitchen_id']

  static relationMappings = {
    cokitchen: {
      relation: Model.BelongsToOneRelation,
      modelClass: Cokitchen,
      join: {
        from: 'cokitchen_home_page_posts.cokitchen_id',
        to: 'cokitchens.id'
      }
    }
  }
}

export default CokithenHomePagePost
