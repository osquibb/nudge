exports.up = function (knex) {
  knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
}

exports.down = function (knex) {
  knex.raw('DROP EXTENSION IF EXISTS pgcrypto;')
}
