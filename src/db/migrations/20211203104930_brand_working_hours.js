export const up = knex =>
  knex.schema.createTable('brand_working_hours', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('brand_id')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE')
      .notNullable()
    table.boolean('active').notNullable()
    table.string('name').notNullable()
    table.time('opening_time').notNullable()
    table.time('closing_time').notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('brand_working_hours')
