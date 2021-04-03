export const up = knex =>
  knex.schema.createTable('orders', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('order_type_id')
      .references('id')
      .inTable('order_types')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('user_card_id')
      .references('id')
      .inTable('user_cards')
      .onDelete('CASCADE')
    table.jsonb('order_details').notNullable()
    table.boolean('completed').notNullable().defaultTo(true)
    table.boolean('cancelled').defaultTo(false)
    table.boolean('paid').defaultTo(false)
    table
      .uuid('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .onDelete('CASCADE')
      .notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('orders')