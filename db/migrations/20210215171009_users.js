exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").unique();
    table.string("email").unique();
    table
      .enum("role", [
        "customer",
        "rider",
        "marketing",
        "logistics-admin",
        "admin",
        "super-admin",
      ])
      .defaultTo("customer");
    table.string("first_name");
    table.string("last_name");
    table.string("other_name");
    table.string("phone_number").unique().notNullable();
    table.string("gender");
    table.string("password");
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
