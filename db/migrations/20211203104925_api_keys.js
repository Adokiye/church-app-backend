export const up = knex =>
  knex.schema.createTable('api_keys', table => {
    table.uuid('id').primary()
    table
      .string('key')
      .unique()
      .notNullable()
      .defaultTo('7bde1c81-f907-42d8-85c3-fdeab72599c4')
    table
      .string('value')
      .notNullable()
      .defaultTo('bbcae501-9729-42c0-9355-d42a488649af')
    table.boolean('active').notNullable().defaultTo(true)
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('api_keys')
