
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
  .createTable('coordinates', table => {
    table.uuid('userId').notNullable()
    table.uuid('gameId').notNullable()
    table.foreign('userId')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.foreign('gameId')
      .references('id')
      .inTable('games')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.timestamps(true, true)
    table.index(['userId', 'gameId'])
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists('coordinates')
};
