export const up = knex =>
  knex.schema.createTable('api_logs', table => {
    table.uuid('id').primary()
    table.string('info').notNullable()
    table.string('type').notNullable()
    table.json('api_data').notNullable()
    table.json('config').defaultTo(JSON.stringify({}))
    table.json('personal_details').defaultTo(JSON.stringify({}))
    table.string('action')
    table.integer('retryCount').defaultTo(0)
    table.boolean('successful').notNullable()
    table.timestamps(true, true)
  })

export const down = knex => knex.schema.dropTableIfExists('api_logs')
