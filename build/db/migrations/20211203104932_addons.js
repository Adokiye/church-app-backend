"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('addons', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('meal_id').references('id').inTable('meals').onDelete('CASCADE').notNullable();
    table.string('name').notNullable();
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}));
    table["boolean"]('is_combo').notNullable().defaultTo(false);
    table.bigInteger('amount').notNullable();
    table.integer('preparation_time').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('addons');
};

exports.down = down;
//# sourceMappingURL=20211203104932_addons.js.map