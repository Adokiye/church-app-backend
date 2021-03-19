'use strict'

exports.up = function (knex) {
  return knex.schema.createTable('otps', function (table) {
    table.uuid('id').unique().primary().notNullable()
    table.string('action').notNullable()
    table.string('phone_number').notNullable()
    table.string('otp_token').notNullable()
    table['boolean']('verified').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('otps')
}
//# sourceMappingURL=20210215174227_otp.js.map
