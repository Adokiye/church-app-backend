import { baseModel, modelUuid } from './index'

class BrandBusinessMetadata extends modelUuid(baseModel) {
  static tableName = 'brand_business_metadatas'
}

export default BrandBusinessMetadata
