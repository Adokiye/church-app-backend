import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

class Role extends modelUuid(baseModel) {
  static tableName = 'roles'
}
export default Role
