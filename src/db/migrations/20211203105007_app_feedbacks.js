export const up = knex =>
  knex.schema.createTable('app_feedbacks', table => {
    table.uuid('id').primary().notNullable()
    table.string('feedback').notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('app_feedbacks')
