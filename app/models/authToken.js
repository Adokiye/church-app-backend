const { Model } = require('objection');
const knex = require('../../db/knex')

Model.knex(knex)

class AuthToken extends Model {
  static get tableName() {
    return 'authToken';
  }
}