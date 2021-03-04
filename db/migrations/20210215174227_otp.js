
exports.up = function(knex) {
    return knex.schema.createTable('otp', table => {
        table.uuid('id')
        table.string('action').notNullable()
        table.string('phone_number').notNullable()
        table.string('otp_token').notNullable();
        table.boolean('verified').notNullable().defaultTo(false);
        table.timestamps(true,true);

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('otp')
};
