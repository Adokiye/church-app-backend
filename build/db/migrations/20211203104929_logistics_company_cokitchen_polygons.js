'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.down = exports.up = void 0

var up = function up(knex) {
  return knex.schema.createTable(
    'logistics_company_cokitchen_polygons',
    function (table) {
      table.uuid('id').primary().notNullable()
      table['boolean']('active').notNullable().defaultTo(true)
      table
        .uuid('cokitchen_polygon_id')
        .references('id')
        .inTable('cokitchen_polygons')
        .onDelete('CASCADE')
        .notNullable()
      table.string('name')
      table.timestamps(true, true)
    }
  )
}

exports.up = up

var down = function down(knex) {
  return knex.schema.dropTableIfExists('logistics_company_cokitchen_polygons')
}

exports.down = down
//# sourceMappingURL=20211203104929_logistics_company_cokitchen_polygons.js.map
