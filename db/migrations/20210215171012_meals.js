exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("meals", (table) => {
    table.uuid('id').primary().notNullable()
    table.string("name").unique();
    table.timestamps(true,true);
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.jsonb("posist_data").notNullable().defaultTo(JSON.stringify({}));
    table.uuid('meal_category_id').references('id').inTable('meal_categories').onDelete('CASCADE').notNullable();

    table.boolean('is_addon').notNullable().defaultTo(false)
    table.boolean('is_combo').notNullable().defaultTo(false)
    table.bigInteger('amount').notNullable()
    table.integer('preparation_time').notNullable()
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("meals");
};
