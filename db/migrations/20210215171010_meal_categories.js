exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("meal_categories", (table) => {
    table.uuid('id').primary()
    table.string("name").unique();
    table.timestamps(true,true);
    table
    .foreign('created_by')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE').notNullable()
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("meal_categories");
};
