export const up = knex =>
  knex.schema.createTable('logistics_company_cokitchen_polygons', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.uuid('cokitchen_polygon_id').references('id').inTable('cokitchen_polygons').onDelete('CASCADE').notNullable();
    table.string("name");
    table.timestamps(true,true);
  })

export const down = knex => knex.schema.dropTableIfExists('logistics_company_cokitchen_polygons')
