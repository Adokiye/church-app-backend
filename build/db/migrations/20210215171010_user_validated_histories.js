"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('user_validated_histories', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.date('validated_date').notNullable();
    table.time('validated_time').notNullable();
    table.uuid('admin_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_validated_histories');
};
//# sourceMappingURL=20210215171010_user_validated_histories.js.map