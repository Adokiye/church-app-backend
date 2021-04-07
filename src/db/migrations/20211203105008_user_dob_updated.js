export const up = knex =>
  knex.schema.createTable('user_dob_updated', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('user_dob_updated')
