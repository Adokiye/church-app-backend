exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable("roles", (table) => {
    table.uuid('id').primary()
    table.string("name").unique();
    table.timestamps(true,true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};
