'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema.createTable('api_keys', function (table) {
    table.uuid('id').primary().notNullable()
    table
      .string('key')
      .unique()
      .notNullable()
      .defaultTo('7bde1c81-f907-42d8-85c3-fdeab72599c4')
    table
      .string('value')
      .notNullable()
      .defaultTo('bbcae501-9729-42c0-9355-d42a488649af')
    table['boolean']('active').notNullable().defaultTo(true)
    table.timestamps(true, true)
  })
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('api_keys')
}

exports.down = down
//# sourceMappingURL=20211203104925_api_keys.js.map
