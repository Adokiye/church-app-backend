'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('logistics_companies', function (table) {
      table.uuid('id').primary().notNullable()
      table['boolean']('active').notNullable().defaultTo(true)
      table.string('name').unique().notNullable()
      table.string('logo')
      table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
      table.string('address').unique().notNullable()
      table.specificType('contact_email', 'CITEXT').unique()
      table.string('contact_phone_number').unique().notNullable()
      table.timestamps(true, true)
    })
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('logistics_companies')
}

exports.down = down
//# sourceMappingURL=20210003104927_logistics_companies.js.map
