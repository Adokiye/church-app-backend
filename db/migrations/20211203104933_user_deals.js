export const up = knex =>
  knex.schema.createTable('user_deals', table => {
    table.uuid('id').primary().notNullable()
    table.uuid('deal_id').notNullable()
    table
    .foreign('deal_id')
    .references('id')
    .inTable('deals')
    .onDelete('CASCADE').notNullable()
    table.uuid('user_id').notNullable()
    table
    .foreign('user_id')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE').notNullable()
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('brands')
