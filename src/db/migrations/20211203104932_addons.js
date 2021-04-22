export const up = knex =>
  knex.schema.createTable('addons', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('meal_addon_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE')
      .notNullable()
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))

    table.boolean('is_combo').notNullable().defaultTo(false)
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('addons')
