'use strict'

exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('user_settings', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('user_id').references('id').inTable('users')
      table['boolean']('email_notification').defaultTo(true)
      table['boolean']('sms_notification').defaultTo(true)
      table['boolean']('order_statement').defaultTo(true)
      table.string('statement_frequency')
      table['boolean']('device_notification').defaultTo(true)
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user_settings')
}
//# sourceMappingURL=20210215171010_user_settings.js.map
