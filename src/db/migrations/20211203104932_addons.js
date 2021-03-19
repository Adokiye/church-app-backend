export const up = knex =>
  knex.schema.createTable('addons', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('meal_id')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE')
      .notNullable()

    table.string('name').notNullable()
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))

    table.boolean('is_combo').notNullable().defaultTo(false)
    table.bigInteger('amount').notNullable()
    table.integer('preparation_time').notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('addons')
