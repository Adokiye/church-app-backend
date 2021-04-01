"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('cokitchen_home_page_posts', function (table) {
    table.uuid('id').primary().notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.jsonb('posts').notNullable();
    table.uuid('cokitchen_id').references('id').inTable('cokitchens').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('cokitchen_home_page_posts');
};

exports.down = down;
//# sourceMappingURL=20211203105005_cokitchen_home_page_posts.js.map