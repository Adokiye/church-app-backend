import { baseModel, modelUuid } from './index'

class BrandDescriptiveMetadata extends modelUuid(baseModel) {
  static tableName = 'brand_descriptive_metadatas'
}

export default BrandDescriptiveMetadata
