const tableName = 'games'

exports.up = async function (knex) {
  await knex.schema
    .dropTableIfExists(tableName)
    .createTable(tableName, (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
      table.string('title').notNullable()
      table.datetime('expiration').nullable()
      table.decimal('latitude').notNullable().defaultTo(0)
      table.decimal('longitude').notNullable().defaultTo(0)
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
