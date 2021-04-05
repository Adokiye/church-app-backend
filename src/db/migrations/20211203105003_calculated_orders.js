export const up = knex =>
  knex.schema.createTable('calculated_orders', table => {
    table.uuid('id').primary().notNullable()
    table.string('total_amount').notNullable()
    table.string('delivery_fee').notNullable()
    table.string('service_charge').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('calculated_orders')
