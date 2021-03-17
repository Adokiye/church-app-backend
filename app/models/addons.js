import { baseModel, modelUuid } from './index'

class Addons extends modelUuid(baseModel) {
  static tableName = 'addons'
}

export default Addons
