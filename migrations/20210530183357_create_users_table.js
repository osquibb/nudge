
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('users')
  .createTable('users', table => {
    table.increments('id')
    table.string('username')
    table.string('password')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
