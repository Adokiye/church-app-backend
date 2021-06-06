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
      table.string('role').notNullable()

      table.string('first_name')
      table.string('last_name')

      table.string('other_name')
      table.string('phone_number').unique().notNullable()
      table
        .enu('user_gender', ['male', 'female', 'unspecified'], {})
        .defaultTo('unspecified')
      table.date('dob')
      table.string('password')
      table.string('balance').notNullable().defaultTo('0')

      table.string('password_reset_token').unique()
      table.string('address').notNullable()
      table.enu('marital_status', ['single', 'married'], {}).defaultTo('Single')
      table.string('employment_status').notNullable()
      table.string('educational_background').notNullable()
      table.string('baptismal_status').notNullable()
      table.string('profile_url')
      table.string('member_code').unique().notNullable()

      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
