exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('meal_allergy_metadatas', table => {
      table.uuid('id').primary().notNullable()
      table.string('name').notNullable().unique()
      table.timestamps(true, true)
      table.jsonb('images')
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('meal_allergy_metadatas')
}
