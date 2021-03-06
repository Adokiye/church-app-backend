export const up = knex =>
  knex.schema.createTable('cokitchen_polygons', table => {
    table.uuid('id').primary()
    table.boolean('active').notNullable().defaultTo(true)
    table.jsonb("polygon").notNullable().defaultTo(JSON.stringify([]));
    table.uuid('cokitchen_id').notNullable()
    table
    .foreign('cokitchen_id')
    .references('id')
    .inTable('cokitchens')
    .onDelete('CASCADE').notNullable()
    table.string("name");
    table.integer('delivery_fee');
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('cokitchen_polygons')
