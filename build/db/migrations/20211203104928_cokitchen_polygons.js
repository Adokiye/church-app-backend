"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('cokitchen_polygons', function (table) {
    table.uuid('id').primary().notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.jsonb('polygon').notNullable().defaultTo(JSON.stringify([]));
    table.uuid('cokitchen_id').references('id').inTable('cokitchens').onDelete('CASCADE').notNullable();
    table.string('name');
    table.string('delivery_fee').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('cokitchen_polygons');
};

exports.down = down;
//# sourceMappingURL=20211203104928_cokitchen_polygons.js.map