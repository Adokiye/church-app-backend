import { baseModel, modelUuid } from './index'

class BrandWorkingHour extends modelUuid(baseModel) {
  static tableName = 'brand_working_hours'
}

export default BrandWorkingHour
