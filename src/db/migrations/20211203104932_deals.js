export const up = knex =>
  knex.schema.createTable('deals', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('deal_type_id')
      .references('id')
      .inTable('deal_types')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('deal_value_type_id')
      .references('id')
      .inTable('deal_value_types')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('deal_requirement_type_id')
      .references('id')
      .inTable('deal_requirement_types')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('deal_eligibility_type_id')
      .references('id')
      .inTable('deal_eligibility_types')
      .onDelete('CASCADE')
      .notNullable()
    table.jsonb('brands').notNullable().defaultTo(JSON.stringify([]))
    table
      .uuid('cokitchen_id')
      .references('id')
      .inTable('cokitchens')
      .onDelete('CASCADE')
      .notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('title').notNullable()
    table.string('heading').notNullable()
    table.string('body', 10000).notNullable()
    table.string('min_amount').notNullable().defaultTo('0')
    table.string('max_amount').notNullable().defaultTo('0')
    table.string('fixed_amount').notNullable().defaultTo('0')
    table
      .jsonb('specific_customers')
      .notNullable()
      .defaultTo(JSON.stringify([]))

    table.string('min_items').notNullable().defaultTo('0')
    table.string('max_items').notNullable().defaultTo('0')
    table.string('max_usage').notNullable().defaultTo('0')

    table.string('discount_code').unique().notNullable()
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.decimal('rate', 2, 1)
    table.string('to_start_date').notNullable()
    table.time('to_start_time').notNullable()
    table.string('to_expire_date').notNullable()
    table.time('to_expire_time').notNullable()

    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('deals')
