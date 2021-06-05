export const up = knex =>
  knex.schema.createTable('user_cards', table => {
    table.uuid('id').unique().primary().notNullable()
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table.string('auth').unique()
    table.string('bank')
    table.string('card_name')
    table.boolean('status')
    table.integer('last_four_digit')
    table.string('country_code')
    table.string('expiry_month')
    table.string('expiry_year')
    table.string('signature')
    table.boolean('reusable')
    table.timestamps(true)
  })

export const down = knex => knex.schema.dropTableIfExists('user_cards')
