const db = require('../../dbConfig')

module.exports = {
  addUser: async user =>
    await db('users').insert(user, 'id')
}