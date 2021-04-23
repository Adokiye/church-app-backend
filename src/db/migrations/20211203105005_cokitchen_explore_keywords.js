export const up = knex =>
  knex.schema.createTable('cokitchen_explore_keywords', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('cokitchen_id')
      .references('id')
      .inTable('cokitchens')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('meal_keyword_id')
      .references('id')
      .inTable('meal_keywords')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex =>
  knex.schema.dropTableIfExists('cokitchen_explore_keywords')
