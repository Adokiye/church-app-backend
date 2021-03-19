import Knex from 'knex'

import knexConfig from '../../db/knexfile.js'
import { NODE_ENV } from '../config.js'

const knex = Knex(knexConfig[NODE_ENV || 'test'])

const DatabaseTest = {
  createDB: () => knex.migrate.latest(),
  destroyDB: () => knex.migrate.rollback(null, true)
}

export default DatabaseTest
