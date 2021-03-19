import { baseModel, modelUuid } from './index'

class Addon extends modelUuid(baseModel) {
  static tableName = 'addons'
}

export default Addon
