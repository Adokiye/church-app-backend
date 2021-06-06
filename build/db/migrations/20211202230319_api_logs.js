"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('api_logs', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('info').notNullable();
    table.string('type').notNullable();
    table.json('api_data').notNullable();
    table.json('config').defaultTo(JSON.stringify({}));
    table.json('personal_details').defaultTo(JSON.stringify({}));
    table.string('action');
    table.integer('retryCount').defaultTo(0);
    table["boolean"]('successful').notNullable();
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('api_logs');
};

exports.down = down;
//# sourceMappingURL=20211202230319_api_logs.js.map