import { baseModel, modelUuid } from './index'

class UserSavedAddress extends modelUuid(baseModel) {
  static tableName = 'user_saved_addresses'

  static hidden = ['user_id']
}

export default UserSavedAddress
