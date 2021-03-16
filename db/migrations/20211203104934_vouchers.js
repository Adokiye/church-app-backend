export const up = knex =>
  knex.schema.createTable('vouchers', table => {
    table.uuid('id').primary().notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string("name").notNullable();
    table.string("description",1000).notNullable();
    table.bigInteger("amount",).notNullable().defaultTo(0);
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.string('to_expire')
   
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('vouchers')
