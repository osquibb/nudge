
exports.up = function(knex) {
  return  knex.schema.dropTableIfExists('user_roles')
  .createTable('user_roles', table => {
    table.uuid('user_id').notNullable()
    table.uuid('role_id').notNullable()
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.foreign('role_id')
      .references('id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.timestamps(true, true)
    table.primary(['user_id', 'role_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_roles')
};
