export const up = knex =>
  knex.schema.createTable('posts', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('name').notNullable()
    table.string('summary', 500)
    table.string('description', 10000).notNullable()
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table
    .uuid('deal_id')
    .references('id')
    .inTable('deals')
    .onDelete('CASCADE')
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('posts')
