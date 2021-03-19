'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema.createTable('vouchers', function (table) {
    table.uuid('id').primary().notNullable()
    table['boolean']('active').notNullable().defaultTo(true)
    table.string('name').notNullable()
    table.string('description', 1000).notNullable()
    table.bigInteger('amount').notNullable().defaultTo(0)
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.string('to_expire')
    table.timestamps(true, true)
  })
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('vouchers')
}

exports.down = down
//# sourceMappingURL=20211203104934_vouchers.js.map
