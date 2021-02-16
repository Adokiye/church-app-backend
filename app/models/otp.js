const { Model } = require('objection');
const knex = require('../../db/knex')

Model.knex(knex)

class Otp extends Model {
  static get tableName() {
    return 'otp';
  }
}