"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('roles', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('roles');
};
//# sourceMappingURL=20210215171008_roles.js.map