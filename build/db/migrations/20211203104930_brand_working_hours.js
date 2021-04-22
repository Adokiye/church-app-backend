"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('brand_working_hours', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('brand_id').references('id').inTable('brands').onDelete('CASCADE').notNullable();
    table["boolean"]('active').notNullable();
    table.string('name').notNullable();
    table.time('opening_time').notNullable();
    table.time('closing_time').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('brand_working_hours');
};

exports.down = down;
//# sourceMappingURL=20211203104930_brand_working_hours.js.map