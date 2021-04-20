"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('user_saved_addresses', function (table) {
    table.uuid('id').primary().notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.string('lat').notNullable();
    table.string('lng').notNullable();
    table.string('phone_number');
    table.string('street_number');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('user_saved_addresses');
};

exports.down = down;
//# sourceMappingURL=20211203105006_user_saved_addresses.js.map