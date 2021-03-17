exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("meal_categories", (table) => {
    table.uuid('id').primary().notNullable()
    table.string("name").unique();
    table.timestamps(true,true);
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.jsonb("posist_data").notNullable().defaultTo(JSON.stringify({}));

    table.uuid('super_meal_category_id').references('id').inTable('super_meal_categories').onDelete('CASCADE');

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("meal_categories");
};
