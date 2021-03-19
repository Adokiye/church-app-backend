export const up = knex =>
  knex.schema.createTable('deals', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('deal_type_id')
      .references('id')
      .inTable('deal_types')
      .onDelete('CASCADE')
      .notNullable()

    table
      .uuid('brand_id')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE')
      .notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('name').notNullable()
    table.string('description', 1000).notNullable()
    table.bigInteger('min').notNullable().defaultTo(0)
    table.bigInteger('max').notNullable().defaultTo(0)
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.decimal('rate', 2, 1).notNullable()
    table.string('to_expire').notNullable()

    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('deals')
