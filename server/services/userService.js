const db = require('../../db')

module.exports = {
  listUsers: async () =>
    await db('users').select(),

  findUser: async user => await db('users')
    .whereRaw('password = crypt(?, password)', [user.password])
    .andWhere('username', user.username).first(),

  findUserById: async id => await db('users').where({ id }).first(),

  addUser: async user => {
    const resultSet = await db.raw(
      "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
      [user.username, user.password]
    )
    return resultSet.rows?.[0]?.id
  },

  deleteUserById: async id =>
    await db('users').where({ id }).del()
}