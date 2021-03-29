import { baseModel, modelUuid } from './index'

class BrandTag extends modelUuid(baseModel) {
  static tableName = 'brand_tags'
}

export default BrandTag
