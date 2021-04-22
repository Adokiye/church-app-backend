"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('meal_category_selection_types', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}));
    table.string('icon');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('meal_category_selection_types');
};
//# sourceMappingURL=20210215171010_meal_category_selection_types.js.map