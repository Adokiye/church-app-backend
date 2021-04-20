"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('app_feedbacks', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('feedback').notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('app_feedbacks');
};

exports.down = down;
//# sourceMappingURL=20211203105007_app_feedbacks.js.map