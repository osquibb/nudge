
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('games')
  .createTable('games', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('title').notNullable()
    table.datetime('expiration').nullable()
    table.decimal('latitude').notNullable().defaultTo(0)
    table.decimal('longitude').notNullable().defaultTo(0)
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists('games')
};
