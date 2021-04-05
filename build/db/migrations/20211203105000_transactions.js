"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.string('amount');
    table.enu('transaction_type', ['Deposit', 'Transfer', 'Withdraw'], {// useNative: true,
      // enumName: 'transaction_type',
    });
    table.enu('transaction_action', ['Credit', 'Debit'], {// useNative: true,
      // enumName: 'transaction_action',
    });
    table.enu('transaction_status', ['Pending', 'Success', 'Failed'], {// useNative: true,
      // enumName: 'transaction_status',
    }).defaultTo('Pending');
    table.string('description');
    table.string('reason');
    table.string('reference');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.timestamps(true);
  });
};

exports.up = up;

var down = function down(knex) {
  return knex.schema.dropTableIfExists('transactions'); // knex.raw(
  //     `
  //     DROP TYPE "transaction_type";
  //     `
  //   );
  //   return knex.raw(
  //     `
  //     DROP TYPE "transaction_status";
  //     `
  //   );
  // return knex.raw(
  //     `
  //     DROP TYPE "transaction_action";
  //     `
  //   );
};

exports.down = down;
//# sourceMappingURL=20211203105000_transactions.js.map