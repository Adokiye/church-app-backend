"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('calculated_orders', function (table) {
    table.uuid('id').primary().notNullable();
    table.bigInteger('total_amount').notNullable();
    table.bigInteger('delivery_fee').notNullable();
    table.bigInteger('service_charge').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('calculated_orders');
};

exports.down = down;
//# sourceMappingURL=20211203105003_calculated_orders.js.map