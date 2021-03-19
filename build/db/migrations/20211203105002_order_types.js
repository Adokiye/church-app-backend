'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema.createTable('order_types', function (table) {
    table.uuid('id').primary().notNullable()
    table.string('name').unique().notNullable()
    table.timestamps(true, true)
  })
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('order_types')
}

exports.down = down
//# sourceMappingURL=20211203105002_order_types.js.map
