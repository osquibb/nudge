
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
  .createTable('coordinates', table => {
    table.uuid('userId').notNullable()
    table.uuid('gameId').notNullable()
    table.foreign('userId').references('id').inTable('users')
    table.foreign('gameId').references('id').inTable('games')
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.index(['userId', 'gameId'])
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
};
