exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("users", (table) => {
    table.uuid('id').primary()
    table.string("username").unique();
    table.specificType('email', 'CITEXT').unique()
    table.boolean('email_confirmed').notNullable().defaultTo(false)
    table.string('email_confirm_token').unique()
    table.uuid('role_id').notNullable()
      table
      .foreign('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE').notNullable()
    table.string("first_name");
    table.string("last_name");
    table.string("other_name");
    table.string("phone_number").unique().notNullable();
    table.enu('gender', ['male', 'female'])
    table.string('dob')
    table.string("password");
    table.string('password_reset_token').unique()
    table.timestamps(true,true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
