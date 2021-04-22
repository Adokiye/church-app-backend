exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('meal_categories', table => {
      table.uuid('id').primary().notNullable()
      table.string('name').unique()
      table.string('summary', 80)
      table.string('description', 1000)
      table.timestamps(true, true)
      table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
      table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))
      table.string('icon')
      table
        .uuid('meal_category_selection_type_id')
        .references('id')
        .inTable('meal_category_selection_types')
        .onDelete('CASCADE')
      table
        .uuid('super_meal_category_id')
        .references('id')
        .inTable('super_meal_categories')
        .onDelete('CASCADE')
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('meal_categories')
}
