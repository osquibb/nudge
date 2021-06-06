
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('roles')
  .createTable('roles', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles')
};
