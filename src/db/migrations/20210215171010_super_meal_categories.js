exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('super_meal_categories', table => {
      table.uuid('id').primary().notNullable()
      table.string('name').unique()
      table.timestamps(true, true)
      table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))
      table.string('icon')

    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('super_meal_categories')
}
