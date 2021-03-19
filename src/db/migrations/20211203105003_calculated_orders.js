export const up = knex =>
  knex.schema.createTable('calculated_orders', table => {
    table.uuid('id').primary().notNullable()
    table.bigInteger('total_amount').notNullable()
    table.bigInteger('delivery_fee').notNullable()
    table.bigInteger('service_charge').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('calculated_orders')
