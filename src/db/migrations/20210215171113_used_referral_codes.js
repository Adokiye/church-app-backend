exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('used_referral_codes', table => {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.uuid('referral_code_id').references('id').inTable('referral_codes').onDelete('CASCADE').notNullable()

      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('used_referral_codes')
}
