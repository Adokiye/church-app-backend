import { baseModel, modelUuid } from './index'

class FaqArrangement extends modelUuid(baseModel) {
  static tableName = 'faq_arrangements'
}

export default FaqArrangement
