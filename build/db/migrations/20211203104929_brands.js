"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('brands', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('cokitchen_id').references('id').inTable('cokitchens').onDelete('CASCADE').notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.string('name').notNullable();
    table.string('summary', 80);
    table.string('description', 1000);
    table.time('opening_time');
    table.time('closing_time');
    table.string('logo');
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}));
    table.jsonb('brand_tags').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('brand_keywords').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('brand_descriptive_metadatas').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('brand_business_metadatas').notNullable().defaultTo(JSON.stringify([]));
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('brands');
};

exports.down = down;
//# sourceMappingURL=20211203104929_brands.js.map