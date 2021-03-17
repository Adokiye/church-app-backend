exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("user_settings", (table) => {
    table.uuid('id').unique().primary().notNullable();
    table.uuid('user_id').references('id').inTable('users');
    table.boolean('email_notification').defaultTo(true);
    table.boolean('sms_notification').defaultTo(true);
    table.boolean('order_statement').defaultTo(true);
    table.string('statement_frequency');
    table.boolean('device_notification').defaultTo(true);
    table.timestamps(true,true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("user_settings");
};
