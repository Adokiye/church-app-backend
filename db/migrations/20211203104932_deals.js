export const up = knex =>
  knex.schema.createTable('brands', table => {
    table.uuid('id').primary()
    table.uuid('deal_type_id').notNullable()
    table
    .foreign('deal_type_id')
    .references('id')
    .inTable('deal_types')
    .onDelete('CASCADE').notNullable()
    table.uuid('brand_id').notNullable()
    table
    .foreign('brand_id')
    .references('id')
    .inTable('brands')
    .onDelete('CASCADE').notNullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.string("name").notNullable();
    table.string("description",1000).notNullable();
    table.integer("min",).notNullable().defaultTo(0);
    table.integer("max",).notNullable().defaultTo(0);
    table.jsonb("images").notNullable().defaultTo(JSON.stringify([]));
    table.decimal('rate', 1, 2).notNullable()
    table.timestamps(true,true);

  })

export const down = knex => knex.schema.dropTableIfExists('brands')
