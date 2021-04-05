export const up = knex =>
  knex.schema.createTable('cokitchens', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string('name').notNullable()
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]))
    table.string('lat')
    table.string('lng')
    table.string('address')
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}))
    table.string('delivery_fee')
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('cokitchens')
