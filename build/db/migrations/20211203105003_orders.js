"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('orders', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('order_type_id').references('id').inTable('order_types').onDelete('CASCADE').notNullable();
    table.uuid('user_card_id').references('id').inTable('user_cards').onDelete('CASCADE');
    table.jsonb('order_details').notNullable().defaultTo([]);
    table["boolean"]('completed').notNullable().defaultTo(false);
    table["boolean"]('cancelled').defaultTo(false);
    table["boolean"]('paid').defaultTo(false);
    table.uuid('calculated_order_id').references('id').inTable('calculated_orders').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('orders');
};

exports.down = down;
//# sourceMappingURL=20211203105003_orders.js.map