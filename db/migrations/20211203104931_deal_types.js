export const up = knex =>
  knex.schema.createTable('deal_types', table => {
    table.uuid('id').primary()
    table.string("name").notNullable();
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('brands')
