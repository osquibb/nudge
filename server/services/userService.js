const db = require('../../db')

module.exports = {
  listUsers: async () =>
    await db('users').select(),

  findUser: async user => {
    const resultSet = await db('users')
      .whereRaw('password = crypt(?, password)', [user.password])
      .andWhere('username', user.username)
    return resultSet[0]
  },

  findUserById: async id => {
    const resultSet = await db('users').where('id', id)
    return resultSet[0]
  },

  addUser: async user => {
    const resultSet = await db.raw(
      "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
      [user.username, user.password]
    )
    return resultSet.rows?.[0]?.id
  },

  deleteUserById: async id =>
    await db('users').where('id', id).del()
}