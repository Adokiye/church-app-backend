"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('user_cards', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.string('auth');
    table.string('bank');
    table.string('card_name');
    table["boolean"]('status');
    table.integer('last_four_digit');
    table.string('country_code');
    table.string('expiry_month');
    table.string('expiry_year');
    table.string('signature');
    table["boolean"]('reusable');
    table.timestamps(true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('user_cards');
};

exports.down = down;
//# sourceMappingURL=20211203105001_user_cards.js.map