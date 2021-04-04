exports.up = function (knex) {
  return knex.schema.createTable('device_tokens', table => {
    table.uuid('id').primary().notNullable()
    table.string('device_token').notNullable().unique()
    table.string('device_type').notNullable()
    table.string('device_name').notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('device_tokens')
}
