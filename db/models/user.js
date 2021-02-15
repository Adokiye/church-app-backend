const { Model } = require('objection');
const knex = require('../knex')

Model.knex(knex)

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
      const Message = require('./Message')
      return {
          messages: {
              relation: Model.HasManyRelation,
              modelClass: Message,
              join: {
                  from: 'users.id',
                  to: 'messages.user_id'
              }
          }
      }
  }
}