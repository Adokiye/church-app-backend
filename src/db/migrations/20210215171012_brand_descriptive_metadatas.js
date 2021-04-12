exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('brand_descriptive_metadatas', table => {
      table.uuid('id').primary().notNullable()
      table.string('name').notNullable().unique()
      table.timestamps(true, true)
      table.jsonb('images')
      table.string('icon')

    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('brand_descriptive_metadatas')
}
