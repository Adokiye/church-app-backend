import { baseModel, modelUuid } from './index'

class Faq extends modelUuid(baseModel) {
  static tableName = 'faqs'
}

export default Faq
