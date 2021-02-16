
exports.up = function(knex) {
    return knex.schema.createTable('otp', table => {
        table.increments('id')
        table.string('action').notNullable()
        table.string('phone_number').unique().notNullable()
        table.string('otp_token').notNullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.timestamps(true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('otp')
};
