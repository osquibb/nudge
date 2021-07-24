
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('user_games')
  .createTable('user_games', table => {
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
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists('user_games')
};
