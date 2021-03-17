export const up = knex =>
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  .createTable('logistics_companies', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string("name").unique().notNullable();
    table.string("logo");
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.string("address").unique().notNullable();
    table.specificType("contact_email", 'CITEXT').unique();
    table.string("contact_phone_number").unique().notNullable();
    table.timestamps(true,true);
  })

export const down = knex => knex.schema.dropTableIfExists('logistics_companies')
