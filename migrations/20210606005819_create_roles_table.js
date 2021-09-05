const tableName = 'roles'

exports.up = async function (knex) {
  await knex.schema
    .dropTableIfExists(tableName)
    .createTable(tableName, (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('name').notNullable()
      table.timestamps(true, true)
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
