"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('meal_keywords', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table["boolean"]('explore').defaultTo(false);
    table.jsonb('images');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('meal_keywords');
};
//# sourceMappingURL=20210215171012_meal_keywords.js.map