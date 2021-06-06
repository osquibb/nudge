const db = require('../../db')

module.exports = {
  listUsers: async () =>
    await db('users').select(),

  findUser: async user => await db('users')
    .whereRaw('password = crypt(?, password)', [user.password])
    .andWhere('username', user.username).first(),

  findUserById: async id => {
    const user = await db.select('id', 'username').from('users').where({ id }).first()
    if (!user) { throw new Error(`User with id ${id} not found.`) }
    const roles = await db.select('id', 'name').from('roles').innerJoin('user_roles', 'roles.id', 'user_roles.role_id').where({ user_id: id })
    return { ...user, roles }
  },

  addUser: async user => {
    const resultSet = await db.raw(
      "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
      [user.username, user.password]
    )
    return resultSet.rows?.[0]?.id
  },

  deleteUserById: async id => await db('users').where({ id }).del(),

  addUserRole: async (userId, roleId) => db('user_roles').insert({ user_id: userId, role_id: roleId }),

  deleteUserRole: async (userId, roleId) => db('user_roles').where({ user_id: userId, role_id: roleId }).del()
}