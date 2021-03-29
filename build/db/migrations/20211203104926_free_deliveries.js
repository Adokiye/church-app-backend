"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('free_deliveries', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('free_deliveries');
};

exports.down = down;
//# sourceMappingURL=20211203104926_free_deliveries.js.map