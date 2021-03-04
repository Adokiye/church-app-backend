import { baseModel, modelUuid } from './index'

class Cokitchen extends modelUuid(baseModel) {
  static tableName = 'cokitchens'
}

export default Cokitchen
