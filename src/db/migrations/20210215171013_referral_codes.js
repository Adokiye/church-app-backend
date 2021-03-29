exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('referral_codes', table => {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('code')
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('referral_codes')
}
