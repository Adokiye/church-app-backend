"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('faqs', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.string('question').notNullable();
    table.string('answer').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('faqs');
};
//# sourceMappingURL=20210215171010_faqs.js.map