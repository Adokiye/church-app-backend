export const up = knex =>
  knex.schema.createTable('brands', table => {
    table.uuid('id').primary()
    table
    .foreign('created_by')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    table
    .foreign('cokitchen_id')
    .references('id')
    .inTable('cokitchens')
    .onDelete('CASCADE').notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string("name").notNullable();
    table.string("short_description",80).notNullable();
    table.string("full_description",1000).notNullable();
    table.string("opening_time",);
    table.string("closing_time",);
    table.string("logo",).notNullable();
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.jsonb("posist_data").notNullable().defaultTo(JSON.stringify({}));
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('brands')
