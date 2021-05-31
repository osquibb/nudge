const db = require('../../db')

module.exports = {
  listUsers: async () =>
    await db('users').select(),

  findUser: async user => {
    const resultSet = await db('users')
      .where('username', user.username)
      .andWhere('password', user.password)
    return resultSet[0]
  },

  findUserById: async id => {
    const resultSet = await db('users').where('id', id)
    return resultSet[0]
  },

  addUser: async user => {
    const resultSet = await db('users').insert(user, 'id')
    return resultSet[0]
  },

  deleteUserById: async id =>
    await db('users').where('id', id).del()
}