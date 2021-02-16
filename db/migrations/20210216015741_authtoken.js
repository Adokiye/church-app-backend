
exports.up = function(knex) {
    return knex.schema.createTable('authToken', table => {
        table.increments('id')
        table.string('token').notNullable();
        table.integer('user_id').references('id').inTable('users')
        table.timestamps(true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('authToken')
  
};
