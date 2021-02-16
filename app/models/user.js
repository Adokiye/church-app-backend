const { Model } = require("objection");
const knex = require("../../db/knex");
const bcrypt = require("bcrypt");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  // Encrypt the password before it is stored in the database
  async $beforeInsert() {
    await bcrypt.hash(this.password, 10, (err, hash) => {
      this.password = hash;
    });
  }

  //link user to auth token,
  static get relationMappings() {
    const AuthToken = require('./authToken')
    return {
        auth_tokens: {
            relation: Model.HasManyRelation,
            modelClass: AuthToken,
            join: {
                from: 'users.id',
                to: 'authToken.user_id'
            }
        }
    }
}
}
