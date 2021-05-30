export const addUser = async user =>
  await db('users').insert(user, 'id')