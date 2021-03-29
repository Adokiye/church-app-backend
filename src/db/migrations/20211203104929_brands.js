export const up = knex =>
  knex.schema.createTable('brands', table => {
    table.uuid('id').primary().notNullable()
    table
      .uuid('cokitchen_id')
      .references('id')
      .inTable('cokitchens')
      .onDelete('CASCADE')
      .notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('name').notNullable()
    table.string('summary', 80).notNullable()
    table.string('description', 1000).notNullable()
    table.time('opening_time')
    table.time('closing_time')
    table.string('logo')
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))
    table.jsonb('brand_tags').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('brand_keywords').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('brand_descriptive_metadatas').notNullable().defaultTo(JSON.stringify([]))
    table.jsonb('brand_business_metadatas').notNullable().defaultTo(JSON.stringify([]))

   
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('brands')
