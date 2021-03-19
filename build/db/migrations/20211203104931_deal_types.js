'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema.createTable('deal_types', function (table) {
    table.uuid('id').primary().notNullable()
    table.string('name').unique().notNullable()
    table.timestamps(true, true)
  })
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('deal_types')
}

exports.down = down
//# sourceMappingURL=20211203104931_deal_types.js.map
