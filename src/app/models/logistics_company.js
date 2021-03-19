import { baseModel, modelUuid } from './index'
import { Model } from 'objection'

import User from './user'

class LogisticsCompany extends modelUuid(baseModel) {
  static tableName = 'logistics_companies'
}

export default LogisticsCompany
