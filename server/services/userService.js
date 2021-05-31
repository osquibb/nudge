const db = require('../../db')

module.exports = {
  listUsers: async () =>
    await db('users').select(),

  addUser: async user => {
    const id = await db('users').insert(user, 'id')
    return id[0]
  },

  deleteUserById: async id =>
    await db('users').where('id', id).del()
}