"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('user_deals', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('deal_id').references('id').inTable('deals').onDelete('CASCADE').notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('user_deals');
};

exports.down = down;
//# sourceMappingURL=20211203104933_user_deals.js.map