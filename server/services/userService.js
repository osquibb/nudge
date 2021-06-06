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
    const roles = await db.select('name').from('roles').innerJoin('user_roles', 'roles.id', 'user_roles.role_id').where({ user_id: id })
    return { ...user, roles }
  },

  addUser: async user => {
    let user_id
    await db.transaction(async trx => {
      const userResultSet = await trx.raw(
        "INSERT INTO users (username, password) VALUES (?, crypt(?, gen_salt('bf'))) RETURNING id",
        [user.username, user.password]
      )
      user_id = userResultSet.rows?.[0]?.id
      await trx('user_roles').insert({
        user_id,
        role_id: trx.select('id').from('roles').where({ name: 'player' }).first()
      })
    })
    return user_id
  },

  deleteUserById: async id => await db('users').where({ id }).del(),

  addUserRole: async (user_id, role_id) => db('user_roles').insert({ user_id, role_id }),

  deleteUserRole: async (user_id, role_id) => db('user_roles').where({ user_id, role_id }).del()
}