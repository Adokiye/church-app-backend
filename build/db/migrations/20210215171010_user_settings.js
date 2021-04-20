"use strict";

exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS CITEXT').createTable('user_settings', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table["boolean"]('email_notification').defaultTo(true);
    table["boolean"]('sms_notification').defaultTo(true);
    table["boolean"]('order_statement').defaultTo(true);
    table.string('statement_frequency');
    table["boolean"]('device_notification').defaultTo(true);
    table["boolean"]('device_notification_all_deals_and_promotions').defaultTo(true);
    table["boolean"]('device_notification_special_offers_and_announcements').defaultTo(true);
    table["boolean"]('device_notification_when_order_is_on_the_way').defaultTo(true);
    table["boolean"]('device_notification_when_order_is_arriving').defaultTo(true);
    table["boolean"]('device_notification_when_order_is_being_prepared').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_settings');
};
//# sourceMappingURL=20210215171010_user_settings.js.map