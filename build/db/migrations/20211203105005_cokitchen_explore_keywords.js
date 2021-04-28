"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('cokitchen_explore_keywords', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('cokitchen_id').references('id').inTable('cokitchens').onDelete('CASCADE').notNullable();
    table.uuid('meal_keyword_id').references('id').inTable('meal_keywords').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('cokitchen_explore_keywords');
};

exports.down = down;
//# sourceMappingURL=20211203105005_cokitchen_explore_keywords.js.map