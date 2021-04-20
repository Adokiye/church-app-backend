"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('faq_arrangements', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.jsonb('faqs').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('faq_arrangements');
};
//# sourceMappingURL=20210215171011_faq_arrangements.js.map