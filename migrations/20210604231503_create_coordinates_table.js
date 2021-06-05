
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
  .createTable('coordinates', table => {
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
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.timestamps(true, true)
    table.index(['user_id', 'game_id'])
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
};
