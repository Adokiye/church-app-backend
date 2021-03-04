import { baseModel, modelUuid } from './index'

class Brand extends modelUuid(baseModel) {
  static tableName = 'brands'
}

export default Brand
