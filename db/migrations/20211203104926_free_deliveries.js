export const up = knex =>
  knex.schema.createTable('free_deliveries', table => {
    table.uuid('id').primary()
    table
    .foreign('user_id')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    table.boolean('active').notNullable().defaultTo(true)
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('free_deliveries')
