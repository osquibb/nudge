
exports.up = function(knex) {
  knex.raw('CREATE EXTENSION IF NOT EXISTS uuid-ossp')
};

exports.down = function(knex) {
  knex.raw('DROP EXTENSION IF EXISTS uuid-ossp')
};
