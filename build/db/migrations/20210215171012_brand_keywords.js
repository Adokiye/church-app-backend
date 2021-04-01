"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('brand_keywords', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table.jsonb('images');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('brand_keywords');
};
//# sourceMappingURL=20210215171012_brand_keywords.js.map