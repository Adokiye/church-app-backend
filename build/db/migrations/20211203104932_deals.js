"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('deals', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('deal_type_id').references('id').inTable('deal_types').onDelete('CASCADE').notNullable();
    table.uuid('brand_id').references('id').inTable('brands').onDelete('CASCADE').notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.string('name').notNullable();
    table.string('description', 1000).notNullable();
    table.string('min').notNullable().defaultTo(0);
    table.string('max').notNullable().defaultTo(0);
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.decimal('rate', 2, 1).notNullable();
    table.string('to_expire').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('deals');
};

exports.down = down;
//# sourceMappingURL=20211203104932_deals.js.map