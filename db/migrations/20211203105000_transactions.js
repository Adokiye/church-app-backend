export const up = knex =>
    knex.schema.createTable('transactions', (table) => {
      table.uuid('id').unique().primary().notNullable();
      table.bigInteger('amount');
      table.enu('transaction_type', ['Deposit', 'Transfer', 'Withdraw'], {
        useNative: true,
        enumName: 'transaction_type',
      });
      table.enu('transaction_action', ['Credit', 'Debit'], {
        useNative: true,
        enumName: 'transaction_action',
      });
      table
        .enu('transaction_status', ['Pending', 'Success', 'Failed'], {
          useNative: true,
          enumName: 'transaction_status',
        })
        .defaultTo('Pending');
      table.string('description');
      table.string('reason');
      table.string('reference');
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
      table.timestamps(true);
    });
  

export const down = (knex)=> {
    knex.schema.dropTableIfExists('transactions')
    knex.raw(
        `
        DROP TYPE "transaction_type";
        `
      );
      knex.raw(
        `
        DROP TYPE "transaction_status";
        `
      );
      knex.raw(
        `
        DROP TYPE "transaction_action";
        `
      );

}
