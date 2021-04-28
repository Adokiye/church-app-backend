export const up = knex =>
  knex.schema.createTable('deal_requirement_types', table => {
    table.uuid('id').primary().notNullable()
    table.string('name').unique().notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('deal_requirement_types')
