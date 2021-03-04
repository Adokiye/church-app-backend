import { Model, mixin } from 'objection'
import Knex from 'knex'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { DBErrors } from 'objection-db-errors'
import objection_unique from 'objection-unique'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from 'config'

const knex = Knex(knexConfig[NODE_ENV])
Model.knex(knex)

export const modelUuid = guid()
// Import the plugin.
export const modelUnique = objection_unique({
  fields: ['email', 'phone_number',],
  identifiers: ['id']
})

export class baseModel extends mixin(Model, [visibility, DBErrors]) {
  static query(...args) {
    return super.query(...args).throwIfNotFound()
  }
}

export default { baseModel, modelUuid, modelUnique }
