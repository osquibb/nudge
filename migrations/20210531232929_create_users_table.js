
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('users')
  .createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('username').notNullable()
    table.string('password')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
