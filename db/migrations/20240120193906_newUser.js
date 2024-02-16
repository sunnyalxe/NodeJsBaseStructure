/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
    .createTable('users', function (table) {
        table.increments('id').unsigned().primary();
        table.string('username', 255).notNullable();
        table.string('email', 255).notNullable().unique().comment('This is the email field');
        table.string('password', 255).notNullable();
        table.timestamp('created_at').defaultTo().notNull()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNull()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
    .dropTable("users");
}
