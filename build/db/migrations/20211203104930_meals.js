"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('meals', function (table) {
    table.uuid('id').primary().notNullable();
    table.string('name').unique();
    table.timestamps(true, true);
    table.jsonb('images').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('posist_data').notNullable().defaultTo(JSON.stringify({}));
    table.uuid('meal_category_id').references('id').inTable('meal_categories').onDelete('CASCADE').notNullable();
    table.uuid('brand_id').references('id').inTable('brands').onDelete('CASCADE').notNullable();
    table["boolean"]('is_addon').notNullable().defaultTo(false);
    table["boolean"]('is_combo').notNullable().defaultTo(false);
    table.bigInteger('amount').notNullable();
    table.integer('preparation_time').notNullable();
    table.jsonb('meal_tags').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('meal_keywords').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('meal_descriptive_metadatas').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('meal_business_metadatas').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('meal_dietary_metadatas').notNullable().defaultTo(JSON.stringify([]));
    table.jsonb('meal_allergy_metadatas').notNullable().defaultTo(JSON.stringify([]));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('meals');
};
//# sourceMappingURL=20211203104930_meals.js.map