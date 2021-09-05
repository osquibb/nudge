const tableName = 'user_roles'

exports.up = async function (knex) {
  await knex.schema
    .dropTableIfExists(tableName)
    .createTable(tableName, (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('role_id').notNullable()
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps(true, true)
      table.primary(['user_id', 'role_id'])
    })
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `)
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}
