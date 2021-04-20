"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('brand_tags', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table.jsonb('images');
    table.string('icon');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('brand_tags');
};
//# sourceMappingURL=20210215171012_brand_tags.js.map