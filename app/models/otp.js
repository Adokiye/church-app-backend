import { Model } from 'objection'

import { baseModel, modelUuid, modelUnique } from './index'

class User extends modelUuid(baseModel) {
  static tableName = "users";
}