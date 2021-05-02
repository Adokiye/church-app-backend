export const up = knex =>
  knex.schema.createTable('calculated_orders', table => {
    table.uuid('id').primary().notNullable()
    table.string('total_amount').notNullable()
    table.string('delivery_fee').notNullable()
    table.string('service_charge').notNullable().defaultTo('0')
    table.jsonb('address_details').notNullable()
    table.jsonb('meals').notNullable()
    table.jsonb('posist_meals').notNullable()
    table.string('lat').notNullable()
    table.string('lng').notNullable()
    table.uuid('deal_id').references('id').inTable('deals').onDelete('CASCADE')
    table
      .uuid('cokitchen_polygon_id')
      .references('id')
      .inTable('cokitchen_polygons')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('calculated_orders')
