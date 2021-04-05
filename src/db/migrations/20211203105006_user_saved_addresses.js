export const up = knex =>
  knex.schema.createTable('user_saved_addresses', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.string('name').notNullable()
    table.string('address').notNullable()
    table.bigInteger('lat').notNullable()
    table.bigInteger('lng').notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('user_saved_addresses')