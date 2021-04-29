export const up = knex =>
  knex.schema.createTable('posts', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('title')
    table.string('heading',)
    table.string('body', 10000)
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table
    .uuid('deal_id')
    .references('id')
    .inTable('deals')
    .onDelete('CASCADE')
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('posts')
