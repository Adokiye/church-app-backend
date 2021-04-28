export const up = knex =>
  knex.schema.createTable('deal_value_types', table => {
    table.uuid('id').primary().notNullable()
    table.string('name').unique().notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('deal_value_types')
