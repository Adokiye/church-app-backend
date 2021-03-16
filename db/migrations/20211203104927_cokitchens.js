export const up = knex =>
  knex.schema.createTable('cokitchens', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string("name").notNullable();
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.float('lat', 14, 10).notNullable();
    table.float('lng', 14, 10).notNullable();
    table.string("address").notNullable();
    table.jsonb("posist_data").notNullable().defaultTo(JSON.stringify({}));
    table.integer('delivery_fee');
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('cokitchens')
