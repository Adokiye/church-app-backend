"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('cokitchens', function (table) {
    table.uuid('id').primary().notNullable();
    table["boolean"]('active').notNullable().defaultTo(true);
    table.string('name').notNullable();
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.string('lat');
    table.string('lng');
    table.string('address');
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}));
    table.string('delivery_fee');
    table.timestamps(true, true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('cokitchens');
};

exports.down = down;
//# sourceMappingURL=20211203104927_cokitchens.js.map