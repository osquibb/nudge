const db = require('../../db')

module.exports = {
  listGames: async () => await db('games').select(),

  listGamesAndJoinedStatusByUserId: async user_id => {
  const resultSet = await db.raw('SELECT id, title, latitude, longitude, expiration, user_id IS NOT NULL as is_joined FROM games LEFT OUTER JOIN user_games ON games.id = user_games.game_id WHERE user_id IS NULL OR user_id = ?', [user_id])
  return resultSet.rows
  },

  listGamesByUserId : async user_id =>
    await db('games').innerJoin('user_games', 'games.id', 'user_games.game_id').where({ user_id }),

  findGameById: async id => await db('games').where('id', id).first(),

  addGame: async ({ title, expiration = null }) => {
    const resultSet = await db('games').insert({ title, expiration }).returning('id')
    return resultSet[0]
  },

  deleteGameById: async id => await db('games').where({ id }).del(),

  addUserToGameByUserIdAndGameId: async (user_id, game_id) =>
    await db('user_games').insert({ user_id, game_id }),

  nudge: async (user_id, game_id, latitude, longitude) =>
    await db.transaction(async trx => {
      await trx('games').where({ id: game_id }).update({ latitude, longitude })
      const resultSet =  await trx('user_games').where({ user_id, game_id }).update({ last_nudge_at: new Date() }).returning(['game_id', 'user_id', 'last_nudge_at'])
      return resultSet[0]
    })
}
