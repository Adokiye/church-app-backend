exports.up = function (knex) {
  return knex.schema.createTable("roles", (table) => {
    table.uuid('id').primary().notNullable()
    table.string("name").notNullable().unique();
    table.timestamps(true,true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};
