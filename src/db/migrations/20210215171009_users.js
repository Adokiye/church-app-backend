exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('users', table => {
      table.uuid('id').primary().notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.string('username').unique()
      table.specificType('email', 'CITEXT')
      table.boolean('email_confirmed').notNullable().defaultTo(false)
      table.string('email_confirm_token').unique()
      table
        .string('role')
        .notNullable()

      table.string('first_name')
      table.string('last_name')

      table.string('other_name')
      table.string('phone_number').unique().notNullable()
      table
        .enu('user_gender', ['Male', 'Female', 'Unspecified'], {
          // useNative: true,
          // enumName: 'user_gender',
        })
        .defaultTo('Unspecified')
      table.date('dob')
      table.string('password')
      table.string('password_reset_token').unique()
      table.bigInteger('lat')
      table.bigInteger('lng')
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
  // return knex.raw(
  //   `
  //   DROP TYPE "user_gender";
  //   `
  // );
}
