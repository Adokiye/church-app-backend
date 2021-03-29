import { baseModel, modelUuid } from './index'

class BrandKeyword extends modelUuid(baseModel) {
  static tableName = 'brand_keywords'
}

export default BrandKeyword
