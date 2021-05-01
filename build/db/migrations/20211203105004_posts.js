"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('posts', function (table) {
    table.uuid('id').primary().notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.string('title').notNullable();
    table.string('heading').notNullable();
    table.string('body', 10000).notNullable();
    table.string('to_start_date').notNullable();
    table.time('to_start_time').notNullable();
    table.string('to_expire_date').notNullable();
    table.time('to_expire_time').notNullable();
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.uuid('deal_id').references('id').inTable('deals').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('posts');
};

exports.down = down;
//# sourceMappingURL=20211203105004_posts.js.map