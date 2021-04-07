import { baseModel, modelUuid } from './index'

class UserDobUpdated extends modelUuid(baseModel) {
  static tableName = 'user_dob_updated'
}

export default UserDobUpdated