"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('user_dob_updated', function (table) {
    table.uuid('id').primary().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('user_dob_updated');
};

exports.down = down;
//# sourceMappingURL=20211203105008_user_dob_updated.js.map