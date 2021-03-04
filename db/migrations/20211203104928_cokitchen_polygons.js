export const up = knex =>
  knex.schema.createTable('cokitchen_polygons', table => {
    table.uuid('id').primary()
    table
    .foreign('created_by')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    table.boolean('active').notNullable().defaultTo(true)
    table.specificType("polygon", "geometry(point, 4326)");
    table
    .foreign('cokitchen_id')
    .references('id')
    .inTable('cokitchens')
    .onDelete('CASCADE')
    table.string("name");
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('cokitchen_polygons')
