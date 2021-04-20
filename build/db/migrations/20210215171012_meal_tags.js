"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('meal_tags', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table.jsonb('images');
    table.string('icon');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('meal_tags');
};
//# sourceMappingURL=20210215171012_meal_tags.js.map