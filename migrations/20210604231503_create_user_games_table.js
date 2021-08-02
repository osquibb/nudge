const tableName = 'user_games'

exports.up = async function(knex) {
  await knex.schema.dropTableIfExists(tableName)
  .createTable(tableName, table => {
    table.uuid('user_id').notNullable()
    table.uuid('game_id').notNullable()
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.foreign('game_id')
      .references('id')
      .inTable('games')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.datetime('last_nudge_at').nullable()
    table.timestamps(true, true)
    table.primary(['user_id', 'game_id'])
  })
  await await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `)
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists(tableName)
};
