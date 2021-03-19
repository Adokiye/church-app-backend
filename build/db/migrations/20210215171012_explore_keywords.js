'use strict'

exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('explore_keywords', function (table) {
      table.uuid('id').primary().notNullable()
      table.string('name').notNullable().unique()
      table.timestamps(true, true)
      table.jsonb('images').notNullable()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('explore_keywords')
}
//# sourceMappingURL=20210215171012_explore_keywords.js.map
